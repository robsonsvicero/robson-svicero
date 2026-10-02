import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  MailPlus,
  Pencil,
  RefreshCw,
  RotateCcw,
  Send,
  Trash2,
} from "lucide-react";
import Button from "../../components/ui/Button/Button.jsx";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor.jsx";
import { isSupabaseConfigured, supabase } from "../../lib/supabaseClient.js";
import { sanitizeRichText } from "../../utils/richText.js";

const pageSize = 1000;
const insertBatchSize = 500;
const initialDraft = {
  id: null,
  name: "",
  subject: "",
  previewText: "",
  body: "",
  recipientMode: "all",
};

function createEmailHtml(body) {
  return `<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#202124">${sanitizeRichText(body)}</div>`;
}

function hasEmailBodyContent(body) {
  const documentFragment = new DOMParser().parseFromString(body || "", "text/html");
  return Boolean(documentFragment.body.textContent?.trim() || documentFragment.body.querySelector("img"));
}

function formatDate(value) {
  if (!value) return "Ainda não enviado";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Data indisponível";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(date);
}

function campaignStatusLabel(status) {
  return {
    draft: "Rascunho",
    preparing: "Preparando",
    scheduled: "Agendada",
    sending: "Na fila do Brevo",
    sent: "Concluída",
    failed: "Falhou",
    cancelled: "Cancelada",
  }[status] || status;
}

export default function NewsletterCampaignsPanel() {
  const [campaigns, setCampaigns] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [selectedSubscriberIds, setSelectedSubscriberIds] = useState(() => new Set());
  const [draft, setDraft] = useState(initialDraft);
  const [screen, setScreen] = useState("list");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sendingCampaignId, setSendingCampaignId] = useState(null);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    if (!isSupabaseConfigured) {
      setStatus("Configure o Supabase para acessar as campanhas.");
      setStatusType("error");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("newsletter_campaigns")
      .select("id, name, subject, recipient_mode, recipient_count, queued_count, sent_count, failed_count, delivered_count, bounced_count, soft_bounce_count, complained_count, unsubscribed_count, opened_count, clicked_count, status, failure_reason, created_at, sent_at")
      .order("created_at", { ascending: false });
    setIsLoading(false);

    if (error) {
      setStatus(`Não foi possível carregar as campanhas: ${error.message}`);
      setStatusType("error");
      return;
    }

    setCampaigns(data || []);
  }

  async function loadSubscribers() {
    if (!isSupabaseConfigured) return;

    setIsLoadingSubscribers(true);
    setStatus("");
    try {
      const activeSubscribers = [];
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const { data, error } = await supabase
          .from("newsletter_subscribers")
          .select("id, first_name, email, consent, subscription_status")
          .eq("consent", true)
          .eq("subscription_status", "subscribed")
          .order("created_at", { ascending: false })
          .range(offset, offset + pageSize - 1);

        if (error) throw error;
        const page = data || [];
        activeSubscribers.push(...page);
        hasMore = page.length === pageSize;
        offset += pageSize;
      }

      setSubscribers(activeSubscribers);
      return activeSubscribers;
    } catch (error) {
      setStatus(`Não foi possível carregar os inscritos. Verifique se as migrações da newsletter foram executadas. ${error.message}`);
      setStatusType("error");
      return null;
    } finally {
      setIsLoadingSubscribers(false);
    }
  }

  async function startNewCampaign() {
    setDraft(initialDraft);
    setSelectedSubscriberIds(new Set());
    setSearch("");
    setScreen("edit");
  }

  async function startEditCampaign(campaign) {
    setStatus("");
    try {
      const [recipientResult, campaignResult] = await Promise.all([
        supabase
          .from("newsletter_campaign_recipients")
          .select("subscriber_id")
          .eq("campaign_id", campaign.id),
        supabase
          .from("newsletter_campaigns")
          .select("id, name, subject, preview_text, html_content, recipient_mode")
          .eq("id", campaign.id)
          .single(),
      ]);

      if (recipientResult.error) throw recipientResult.error;
      if (campaignResult.error) throw campaignResult.error;

      const subscriberList = campaignResult.data.recipient_mode === "selected"
        ? await loadSubscribers()
        : [];
      if (campaignResult.data.recipient_mode === "selected" && !subscriberList) return;

      setDraft({
        id: campaignResult.data.id,
        name: campaignResult.data.name,
        subject: campaignResult.data.subject,
        previewText: campaignResult.data.preview_text || "",
        body: campaignResult.data.html_content || "",
        recipientMode: campaignResult.data.recipient_mode,
      });
      const activeSubscriberIds = new Set(subscriberList.map((subscriber) => subscriber.id));
      setSelectedSubscriberIds(new Set(
        (recipientResult.data || [])
          .map((recipient) => recipient.subscriber_id)
          .filter((id) => activeSubscriberIds.has(id)),
      ));
      setSearch("");
      setScreen("edit");
    } catch (error) {
      setStatus(`Não foi possível abrir o rascunho: ${error.message}`);
      setStatusType("error");
    }
  }

  function updateDraft(name, value) {
    setDraft((current) => ({ ...current, [name]: value }));
  }

  async function uploadCampaignImage(file) {
    if (!file || !isSupabaseConfigured) {
      setStatus("Configure o Supabase antes de enviar imagens.");
      setStatusType("error");
      return "";
    }

    const extension = file.name.includes(".") ? file.name.split(".").pop().toLowerCase() : "webp";
    const storagePath = `campaigns/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("site-media").upload(storagePath, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      setStatus(`Não foi possível enviar a imagem: ${error.message}`);
      setStatusType("error");
      return "";
    }

    return supabase.storage.from("site-media").getPublicUrl(storagePath).data.publicUrl || "";
  }

  function updateRecipientMode(value) {
    updateDraft("recipientMode", value);
    if (value === "selected" && subscribers.length === 0 && !isLoadingSubscribers) {
      loadSubscribers();
    }
  }

  function toggleRecipient(id) {
    setSelectedSubscriberIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function setAllRecipientsSelected(shouldSelect) {
    setSelectedSubscriberIds((current) => {
      const next = new Set(current);
      for (const subscriber of filteredSubscribers) {
        if (shouldSelect) next.add(subscriber.id);
        else next.delete(subscriber.id);
      }
      return next;
    });
  }

  async function saveDraft({ sendAfterSave = false } = {}) {
    if (isSaving || !isSupabaseConfigured) return null;
    if (!draft.name.trim() || !draft.subject.trim() || !hasEmailBodyContent(draft.body)) {
      setStatus("Preencha o nome, o assunto e o corpo do e-mail.");
      setStatusType("error");
      return null;
    }
    if (draft.recipientMode === "selected" && selectedSubscriberIds.size === 0) {
      setStatus("Selecione ao menos um inscrito ativo para esta campanha.");
      setStatusType("error");
      return null;
    }

    setIsSaving(true);
    setStatus("");
    try {
      const payload = {
        name: draft.name.trim(),
        subject: draft.subject.trim(),
        preview_text: draft.previewText.trim() || null,
        html_content: createEmailHtml(draft.body),
        recipient_mode: draft.recipientMode,
        recipient_count: draft.recipientMode === "selected" ? selectedSubscriberIds.size : 0,
      };
      let campaignId = draft.id;

      if (campaignId) {
        const { data, error } = await supabase
          .from("newsletter_campaigns")
          .update(payload)
          .eq("id", campaignId)
          .eq("status", "draft")
          .select("id")
          .maybeSingle();
        if (error) throw error;
        if (!data) throw new Error("Este rascunho não está mais disponível para edição.");
      } else {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        const { data, error } = await supabase
          .from("newsletter_campaigns")
          .insert({ ...payload, created_by: userData.user?.id || null })
          .select("id")
          .single();
        if (error) throw error;
        campaignId = data.id;
      }

      const { error: clearRecipientsError } = await supabase
        .from("newsletter_campaign_recipients")
        .delete()
        .eq("campaign_id", campaignId);
      if (clearRecipientsError) throw clearRecipientsError;

      if (draft.recipientMode === "selected") {
        const selectedSubscribers = subscribers.filter((subscriber) => selectedSubscriberIds.has(subscriber.id));
        for (let offset = 0; offset < selectedSubscribers.length; offset += insertBatchSize) {
          const batch = selectedSubscribers.slice(offset, offset + insertBatchSize).map((subscriber) => ({
            campaign_id: campaignId,
            subscriber_id: subscriber.id,
            first_name_snapshot: subscriber.first_name,
            email_snapshot: subscriber.email,
            brevo_contact_id: null,
          }));
          const { error } = await supabase.from("newsletter_campaign_recipients").insert(batch);
          if (error) throw error;
        }
      }

      setDraft((current) => ({ ...current, id: campaignId }));
      setStatus("Rascunho salvo.");
      setStatusType("success");

      if (sendAfterSave) {
        await sendCampaign(campaignId);
      } else {
        setScreen("list");
        await loadCampaigns();
      }

      return campaignId;
    } catch (error) {
      setStatus(`Não foi possível salvar a campanha: ${error.message}`);
      setStatusType("error");
      return null;
    } finally {
      setIsSaving(false);
    }
  }

  async function executeCampaignSend(campaignId) {
    try {
      const { data: result, error } = await supabase.functions.invoke("newsletter-send", {
        body: { campaignId },
      });
      if (error) {
        const errorResponse = error.context instanceof Response
          ? await error.context.clone().json().catch(() => null)
          : null;
        throw new Error(errorResponse?.error || error.message || "O servidor recusou o envio.");
      }
      if (result?.error) throw new Error(result.error);

      setStatus(`Campanha aceita pelo Brevo. ${result.queuedRecipients} destinatário(s) na fila, ${result.skippedRecipients} ignorado(s) e ${result.failedRecipients} com falha.`);
      setStatusType("success");
      setScreen("list");
      await loadCampaigns();
    } catch (error) {
      setStatus(error.message || "Não foi possível enviar a campanha.");
      setStatusType("error");
      setScreen("list");
      await loadCampaigns();
    }
  }

  async function sendCampaign(campaignId) {
    if (sendingCampaignId) return;
    const confirmed = window.confirm("Enviar esta campanha agora? O envio não poderá ser desfeito.");
    if (!confirmed) return;

    setSendingCampaignId(campaignId);
    setStatus("");
    try {
      await executeCampaignSend(campaignId);
    } finally {
      setSendingCampaignId(null);
    }
  }

  async function resendCampaign(campaign) {
    if (sendingCampaignId || ["preparing", "scheduled", "sending"].includes(campaign.status)) return;
    const audience = campaign.recipient_mode === "all" ? "todos os inscritos ativos" : "os destinatários selecionados";
    if (!window.confirm(`Reenviar “${campaign.name}” para ${audience}? Será criada uma nova campanha no Brevo; o histórico anterior será preservado.`)) return;

    setSendingCampaignId(campaign.id);
    setStatus("");
    let copiedCampaignId = null;
    let sendStarted = false;

    try {
      const { data: source, error: sourceError } = await supabase
        .from("newsletter_campaigns")
        .select("name, subject, preview_text, html_content, recipient_mode")
        .eq("id", campaign.id)
        .eq("status", campaign.status)
        .single();
      if (sourceError) throw sourceError;

      let selectedRecipients = [];
      if (source.recipient_mode === "selected") {
        selectedRecipients = [];
        let offset = 0;
        let hasMore = true;
        while (hasMore) {
          const { data, error } = await supabase
            .from("newsletter_campaign_recipients")
            .select("subscriber_id, first_name_snapshot, email_snapshot")
            .eq("campaign_id", campaign.id)
            .range(offset, offset + pageSize - 1);
          if (error) throw error;
          const page = data || [];
          selectedRecipients.push(...page);
          hasMore = page.length === pageSize;
          offset += pageSize;
        }
        if (selectedRecipients.length === 0) throw new Error("A campanha não tem destinatários selecionados para reenviar.");
      }

      const { data: copiedCampaign, error: copyError } = await supabase
        .from("newsletter_campaigns")
        .insert({
          name: `${source.name} (reenvio)`.slice(0, 160),
          subject: source.subject,
          preview_text: source.preview_text,
          html_content: source.html_content,
          recipient_mode: source.recipient_mode,
          recipient_count: selectedRecipients.length,
        })
        .select("id")
        .single();
      if (copyError) throw copyError;
      copiedCampaignId = copiedCampaign.id;

      for (let offset = 0; offset < selectedRecipients.length; offset += insertBatchSize) {
        const batch = selectedRecipients.slice(offset, offset + insertBatchSize).map((recipient) => ({
          campaign_id: copiedCampaignId,
          subscriber_id: recipient.subscriber_id,
          first_name_snapshot: recipient.first_name_snapshot,
          email_snapshot: recipient.email_snapshot,
          brevo_contact_id: null,
        }));
        if (batch.length === 0) continue;
        const { error } = await supabase.from("newsletter_campaign_recipients").insert(batch);
        if (error) throw error;
      }

      sendStarted = true;
      setSendingCampaignId(copiedCampaignId);
      await executeCampaignSend(copiedCampaignId);
    } catch (error) {
      if (copiedCampaignId && !sendStarted) {
        await supabase.from("newsletter_campaigns").delete().eq("id", copiedCampaignId).eq("status", "draft");
      }
      setStatus(`Não foi possível preparar o reenvio: ${error.message}`);
      setStatusType("error");
      setScreen("list");
      await loadCampaigns();
    } finally {
      setSendingCampaignId(null);
    }
  }

  async function deleteCampaign(campaign) {
    if (["preparing", "scheduled", "sending"].includes(campaign.status)) return;
    const confirmed = window.confirm(`Excluir “${campaign.name}” do painel? Isso remove o histórico e as métricas locais, mas não apaga a campanha no Brevo nem desfaz e-mails enviados.`);
    if (!confirmed) return;

    const { data, error } = await supabase
      .from("newsletter_campaigns")
      .delete()
      .eq("id", campaign.id)
      .eq("status", campaign.status)
      .select("id")
      .maybeSingle();
    if (error) {
      setStatus(`Não foi possível excluir a campanha: ${error.message}`);
      setStatusType("error");
      return;
    }
    if (!data) {
      setStatus("A campanha mudou de estado e não foi excluída. Atualize a lista e tente novamente.");
      setStatusType("error");
      return;
    }

    setStatus("Campanha excluída do painel.");
    setStatusType("success");
    await loadCampaigns();
  }

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const query = search.trim().toLocaleLowerCase("pt-BR");
    return !query || `${subscriber.first_name} ${subscriber.email}`.toLocaleLowerCase("pt-BR").includes(query);
  });
  const allFilteredSelected = filteredSubscribers.length > 0
    && filteredSubscribers.every((subscriber) => selectedSubscriberIds.has(subscriber.id));

  return (
    <section className="newsletter-campaigns" aria-labelledby="admin-resource-title">
      <header className="newsletter-campaigns-header">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2 id="admin-resource-title">Campanhas</h2>
          <p>Crie e envie campanhas para inscritos que autorizaram receber comunicações.</p>
        </div>
        {screen === "list" ? (
          <div className="stack" style={{ gap: "var(--space-2)" }}>
            <Button as="button" variant="secondary" type="button" onClick={loadCampaigns} disabled={isLoading}>
              <RefreshCw aria-hidden="true" />
              {isLoading ? "Atualizando..." : "Atualizar métricas"}
            </Button>
            <Button as="button" type="button" onClick={startNewCampaign}>
              <MailPlus aria-hidden="true" />
              Nova campanha
            </Button>
          </div>
        ) : (
          <Button as="button" variant="secondary" type="button" onClick={() => setScreen("list")}>
            <ArrowLeft aria-hidden="true" />
            Voltar às campanhas
          </Button>
        )}
      </header>

      {status && <p className={`admin-status is-${statusType}`} role="status">{status}</p>}

      {screen === "list" ? (
        <div className="newsletter-campaign-list" aria-label="Lista de campanhas">
          {isLoading && <p className="meta">Carregando campanhas...</p>}
          {!isLoading && campaigns.length === 0 && (
            <p className="meta">Nenhuma campanha criada.</p>
          )}
          {!isLoading && campaigns.map((campaign) => (
            <article className="newsletter-campaign-row" key={campaign.id}>
              <div className="newsletter-campaign-copy">
                <div className="newsletter-campaign-title-row">
                  <h3>{campaign.name}</h3>
                  <span className={`newsletter-campaign-status is-${campaign.status}`}>
                    {campaignStatusLabel(campaign.status)}
                  </span>
                </div>
                <p>{campaign.subject}</p>
                {campaign.failure_reason && (
                  <p className="admin-status is-error" role="status">{campaign.failure_reason}</p>
                )}
                <span className="meta">
                  {campaign.recipient_mode === "all" ? "Todos os inscritos ativos" : `${campaign.recipient_count} selecionados`}
                  {campaign.queued_count > 0 ? ` · ${campaign.queued_count} na fila` : ""}
                  {campaign.delivered_count > 0 ? ` · ${campaign.delivered_count} entregues` : ""}
                  {campaign.bounced_count + campaign.soft_bounce_count > 0 ? ` · ${campaign.bounced_count + campaign.soft_bounce_count} bounces` : ""}
                  {campaign.complained_count > 0 ? ` · ${campaign.complained_count} spam` : ""}
                  {campaign.unsubscribed_count > 0 ? ` · ${campaign.unsubscribed_count} descadastros` : ""}
                  {campaign.opened_count > 0 ? ` · ${campaign.opened_count} aberturas` : ""}
                  {campaign.clicked_count > 0 ? ` · ${campaign.clicked_count} cliques` : ""}
                  {campaign.failed_count > 0 ? ` · ${campaign.failed_count} falhas no preparo` : ""}
                  {` · ${formatDate(campaign.created_at)}`}
                </span>
              </div>
              <div className="newsletter-campaign-actions">
                {campaign.status === "draft" && (
                  <Button as="button" variant="secondary" type="button" onClick={() => startEditCampaign(campaign)}>
                    <Pencil aria-hidden="true" />
                    Editar
                  </Button>
                )}
                <Button
                  as="button"
                  variant="secondary"
                  type="button"
                  onClick={() => campaign.status === "draft" ? sendCampaign(campaign.id) : resendCampaign(campaign)}
                  disabled={sendingCampaignId !== null || ["preparing", "scheduled", "sending"].includes(campaign.status)}
                  title={["preparing", "scheduled", "sending"].includes(campaign.status) ? "Indisponível enquanto a campanha está ativa." : undefined}
                >
                  {campaign.status === "draft" ? <Send aria-hidden="true" /> : <RotateCcw aria-hidden="true" />}
                  {sendingCampaignId === campaign.id ? "Enviando..." : campaign.status === "draft" ? "Enviar agora" : "Reenviar"}
                </Button>
                <Button
                  as="button"
                  variant="secondary"
                  type="button"
                  onClick={() => deleteCampaign(campaign)}
                  disabled={sendingCampaignId !== null || ["preparing", "scheduled", "sending"].includes(campaign.status)}
                  title={["preparing", "scheduled", "sending"].includes(campaign.status) ? "Indisponível enquanto a campanha está ativa." : undefined}
                >
                  <Trash2 aria-hidden="true" />
                  Excluir
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <form className="newsletter-campaign-editor" onSubmit={(event) => { event.preventDefault(); saveDraft(); }}>
          <div className="newsletter-campaign-fields">
            <div className="field">
              <label htmlFor="campaign-name">Nome interno</label>
              <input className="input" id="campaign-name" maxLength={160} value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="campaign-subject">Assunto</label>
              <input className="input" id="campaign-subject" maxLength={250} value={draft.subject} onChange={(event) => updateDraft("subject", event.target.value)} required />
            </div>
            <div className="field newsletter-campaign-preview-field">
              <label htmlFor="campaign-preview">Texto de prévia</label>
              <input className="input" id="campaign-preview" maxLength={250} value={draft.previewText} onChange={(event) => updateDraft("previewText", event.target.value)} />
            </div>
          </div>

          <fieldset className="newsletter-recipient-mode">
            <legend>Destinatários</legend>
            <div className="newsletter-mode-options">
              <button type="button" className={draft.recipientMode === "all" ? "is-active" : ""} aria-pressed={draft.recipientMode === "all"} onClick={() => updateRecipientMode("all")}>
                Todos os inscritos ativos
              </button>
              <button type="button" className={draft.recipientMode === "selected" ? "is-active" : ""} aria-pressed={draft.recipientMode === "selected"} onClick={() => updateRecipientMode("selected")}>
                Selecionar contatos
              </button>
            </div>
            {draft.recipientMode === "all" ? (
              <p className="meta">No momento do envio, serão incluídos apenas inscritos ativos com consentimento registrado.</p>
            ) : (
              <div className="newsletter-subscriber-picker">
                <div className="newsletter-subscriber-toolbar">
                  <label className="newsletter-select-all">
                    <input type="checkbox" checked={allFilteredSelected} onChange={(event) => setAllRecipientsSelected(event.target.checked)} />
                    <span>Selecionar todos os filtrados</span>
                  </label>
                  <span className="meta">{selectedSubscriberIds.size} selecionado(s) de {subscribers.length}</span>
                </div>
                <input className="input" type="search" aria-label="Buscar inscritos" placeholder="Buscar por nome ou e-mail" value={search} onChange={(event) => setSearch(event.target.value)} />
                <div className="newsletter-subscriber-list">
                  {isLoadingSubscribers && <p className="meta">Carregando inscritos ativos...</p>}
                  {!isLoadingSubscribers && filteredSubscribers.length === 0 && <p className="meta">Nenhum inscrito ativo encontrado.</p>}
                  {filteredSubscribers.map((subscriber) => (
                    <label className="newsletter-subscriber-option" key={subscriber.id}>
                      <input type="checkbox" checked={selectedSubscriberIds.has(subscriber.id)} onChange={() => toggleRecipient(subscriber.id)} />
                      <span><strong>{subscriber.first_name}</strong><small>{subscriber.email}</small></span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </fieldset>

          <div className="field">
            <label htmlFor="campaign-body">Corpo do e-mail</label>
            <RichTextEditor
              id="campaign-body"
              name="campaign-body"
              value={draft.body}
              onChange={(value) => updateDraft("body", value)}
              onImageUpload={uploadCampaignImage}
            />
            <p className="meta">Use {"{nome_cadastro}"} no assunto, na prévia ou no corpo para inserir o primeiro nome de cada inscrito.</p>
          </div>

          <div className="newsletter-email-preview" aria-label="Prévia do e-mail">
            <p className="eyebrow">Prévia</p>
            <h3>{draft.subject || "Assunto da campanha"}</h3>
            {draft.previewText && <p className="newsletter-preview-text">{draft.previewText}</p>}
            <div className="newsletter-preview-body">
              {draft.body.trim()
                ? <div dangerouslySetInnerHTML={{ __html: sanitizeRichText(draft.body) }} />
                : "O corpo do e-mail aparecerá aqui."}
            </div>
          </div>

          <div className="newsletter-campaign-editor-actions">
            <Button as="button" variant="secondary" type="submit" disabled={isSaving || sendingCampaignId !== null || isLoadingSubscribers}>
              <Check aria-hidden="true" />
              {isSaving ? "Salvando..." : "Salvar rascunho"}
            </Button>
            <Button as="button" type="button" disabled={isSaving || sendingCampaignId !== null || isLoadingSubscribers} onClick={() => saveDraft({ sendAfterSave: true })}>
              <Send aria-hidden="true" />
              {isSaving || sendingCampaignId ? "Preparando envio..." : "Salvar e enviar agora"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
