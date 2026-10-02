import express from "express";
import { createHash, timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { BrevoApiError, createBrevoApi } from "./brevoApi.js";

const subscriberBatchSize = 400;
const contactConcurrency = 5;
const brevoListBatchSize = 500;

function getSupabaseConfig(env) {
  return {
    url: env.SUPABASE_URL || env.VITE_SUPABASE_URL || "",
    anonKey: env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || "",
  };
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

async function mapConcurrent(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (nextIndex < items.length) {
        const index = nextIndex;
        nextIndex += 1;
        results[index] = await mapper(items[index]);
      }
    }),
  );

  return results;
}

function getSafeErrorMessage(error) {
  if (error instanceof BrevoApiError) {
    return `Brevo retornou erro ${error.status}${error.code ? ` (${error.code})` : ""}.`;
  }
  return "Não foi possível processar a campanha.";
}

function matchesWebhookToken(receivedToken, expectedToken) {
  const received = Buffer.from(receivedToken || "");
  const expected = Buffer.from(expectedToken || "");
  return received.length === expected.length
    && received.length > 0
    && timingSafeEqual(received, expected);
}

function normalizeMarketingEvent(value) {
  const event = String(value || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  const eventTypes = {
    delivered: "delivered",
    hard_bounce: "hard_bounce",
    hardbounce: "hard_bounce",
    soft_bounce: "soft_bounce",
    softbounce: "soft_bounce",
    spam: "spam",
    unsubscribe: "unsubscribe",
    unsubscribed: "unsubscribe",
    opened: "opened",
    unique_opened: "opened",
    click: "click",
    clicked: "click",
  };
  return eventTypes[event] || null;
}

function getMarketingEventTimestamp(payload) {
  const epoch = Number(payload.ts_event ?? payload.ts);
  if (Number.isFinite(epoch) && epoch > 0) return new Date(epoch * 1000).toISOString();
  const date = new Date(payload.date_event || payload.date || "");
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function createMarketingEventKey({ campaignId, email, eventType, occurredAt, link }) {
  return createHash("sha256")
    .update([campaignId, email, eventType, occurredAt, link || ""].join("\u0000"))
    .digest("hex");
}

async function getBrevoContact(brevo, identifier) {
  try {
    const { data } = await brevo.getContact(identifier);
    return data;
  } catch (error) {
    if (error instanceof BrevoApiError && error.status === 404) return null;
    throw error;
  }
}

async function syncBrevoContact(brevo, supabase, subscriber) {
  let contact = subscriber.brevo_contact_id
    ? await getBrevoContact(brevo, subscriber.brevo_contact_id)
    : null;

  if (!contact) contact = await getBrevoContact(brevo, subscriber.email);

  if (!contact) {
    try {
      const { data } = await brevo.createContact({
        email: subscriber.email,
        attributes: { FNAME: subscriber.first_name },
      });
      contact = data?.id ? { id: data.id, emailBlacklisted: false } : null;
    } catch (error) {
      if (!(error instanceof BrevoApiError) || error.status !== 400) throw error;
      contact = await getBrevoContact(brevo, subscriber.email);
      if (!contact) throw error;
    }
  } else if (subscriber.first_name) {
    await brevo.updateContact(contact.id, {
      attributes: { FNAME: subscriber.first_name },
    });
  }

  if (!contact?.id) {
    contact = await getBrevoContact(brevo, subscriber.email);
  }

  if (!contact?.id) throw new Error("O Brevo não retornou o ID do contato.");

  if (contact.emailBlacklisted) {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({
        subscription_status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
        brevo_contact_id: contact.id,
        brevo_sync_status: "synced",
        brevo_synced_at: new Date().toISOString(),
        brevo_sync_error: null,
      })
      .eq("id", subscriber.id);
    if (error) throw error;
    return { contactId: contact.id, unsubscribed: true };
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({
      brevo_contact_id: contact.id,
      brevo_sync_status: "synced",
      brevo_synced_at: new Date().toISOString(),
      brevo_sync_error: null,
    })
    .eq("id", subscriber.id);
  if (error) throw error;

  return { contactId: contact.id, unsubscribed: false };
}

async function updateRecipient(supabase, recipientId, status, errorMessage = null) {
  await supabase
    .from("newsletter_campaign_recipients")
    .update({ status, error_message: errorMessage })
    .eq("id", recipientId);
}

export function createNewsletterRouter({
  env = process.env,
  createSupabaseClient = createClient,
  createBrevoClient = createBrevoApi,
} = {}) {
  const router = express.Router();

  router.post("/webhooks/brevo", async (req, res) => {
    const webhookToken = String(env.BREVO_WEBHOOK_TOKEN || "");
    const authorization = String(req.headers.authorization || "");
    const receivedToken = authorization.match(/^Bearer\s+(.+)$/i)?.[1] || "";
    if (!webhookToken) {
      return res.status(503).json({ ok: false, message: "Webhook Brevo não configurado." });
    }
    if (!matchesWebhookToken(receivedToken, webhookToken)) {
      return res.status(401).json({ ok: false, message: "Webhook não autorizado." });
    }

    const { url } = getSupabaseConfig(env);
    const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || "";
    if (!url || !serviceRoleKey) {
      return res.status(503).json({ ok: false, message: "Supabase service role não configurado no servidor." });
    }

    const payloads = Array.isArray(req.body) ? req.body : [req.body];
    if (payloads.length > 500) {
      return res.status(413).json({ ok: false, message: "Lote de eventos acima do limite." });
    }

    try {
      const serviceSupabase = createSupabaseClient(url, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
      });
      let processed = 0;
      let ignored = 0;
      let duplicates = 0;

      for (const payload of payloads) {
        if (!payload || typeof payload !== "object") {
          ignored += 1;
          continue;
        }

        const eventType = normalizeMarketingEvent(payload.event);
        const email = String(payload.email || "").trim().toLowerCase();
        const providerCampaignId = Number(payload.camp_id);
        if (!eventType || !email || !Number.isSafeInteger(providerCampaignId) || providerCampaignId < 1) {
          ignored += 1;
          continue;
        }

        if (eventType === "unsubscribe") {
          const occurredAt = getMarketingEventTimestamp(payload);
          const { error } = await serviceSupabase
            .from("newsletter_subscribers")
            .update({ subscription_status: "unsubscribed", unsubscribed_at: occurredAt })
            .eq("email", email)
            .neq("subscription_status", "unsubscribed");
          if (error) throw error;
        }

        const { data: campaign, error: campaignError } = await serviceSupabase
          .from("newsletter_campaigns")
          .select("id")
          .eq("brevo_campaign_id", providerCampaignId)
          .maybeSingle();
        if (campaignError) throw campaignError;
        if (!campaign) {
          ignored += 1;
          continue;
        }

        const { data: recipient, error: recipientError } = await serviceSupabase
          .from("newsletter_campaign_recipients")
          .select("id, subscriber_id")
          .eq("campaign_id", campaign.id)
          .eq("email_snapshot", email)
          .maybeSingle();
        if (recipientError) throw recipientError;
        if (!recipient) {
          ignored += 1;
          continue;
        }

        const occurredAt = getMarketingEventTimestamp(payload);
        const eventKey = createMarketingEventKey({
          campaignId: campaign.id,
          email,
          eventType,
          occurredAt,
          link: payload.URL || "",
        });
        const { data: wasApplied, error: applyError } = await serviceSupabase.rpc(
          "apply_newsletter_provider_event",
          {
            p_event_key: eventKey,
            p_campaign_id: campaign.id,
            p_recipient_id: recipient.id,
            p_subscriber_id: recipient.subscriber_id,
            p_event_type: eventType,
            p_occurred_at: occurredAt,
          },
        );
        if (applyError) throw applyError;
        if (wasApplied) processed += 1;
        else duplicates += 1;
      }

      return res.status(200).json({ ok: true, processed, duplicates, ignored });
    } catch {
      return res.status(500).json({ ok: false, message: "Não foi possível processar os eventos do Brevo." });
    }
  });

  router.use(async (req, res, next) => {
    const authorization = String(req.headers.authorization || "");
    const token = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
    const { url, anonKey } = getSupabaseConfig(env);

    if (!token) return res.status(401).json({ ok: false, message: "Autenticação necessária." });
    if (!url || !anonKey) {
      return res.status(503).json({ ok: false, message: "Supabase não configurado no servidor." });
    }

    try {
      const supabase = createSupabaseClient(url, anonKey, {
        auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
        global: { headers: { Authorization: `Bearer ${token}` } },
      });
      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data?.user) {
        return res.status(401).json({ ok: false, message: "Sessão inválida ou expirada." });
      }
      if (data.user.app_metadata?.role !== "admin") {
        return res.status(403).json({ ok: false, message: "Acesso não autorizado." });
      }

      req.newsletterSupabase = supabase;
      req.newsletterAdminId = data.user.id;
      return next();
    } catch {
      return res.status(503).json({ ok: false, message: "Não foi possível validar a sessão administrativa." });
    }
  });

  router.get("/brevo/status", (_req, res) => {
    const required = [
      "BREVO_API_KEY",
      "BREVO_CONTACTS_FOLDER_ID",
      "BREVO_SENDER_EMAIL",
      "BREVO_SENDER_NAME",
    ];
    const missing = required.filter((key) => !env[key]);
    return res.json({ configured: missing.length === 0, missing });
  });

  router.post("/campaigns/:campaignId/send", async (req, res) => {
    const campaignId = String(req.params.campaignId || "");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(campaignId)) {
      return res.status(400).json({ ok: false, message: "Identificador de campanha inválido." });
    }

    const required = [
      "BREVO_API_KEY",
      "BREVO_CONTACTS_FOLDER_ID",
      "BREVO_SENDER_EMAIL",
      "BREVO_SENDER_NAME",
    ];
    const missing = required.filter((key) => !env[key]);
    if (missing.length) {
      return res.status(503).json({ ok: false, message: "Integração Brevo incompleta.", missing });
    }

    const supabase = req.newsletterSupabase;
    let campaignWasReserved = false;
    let campaignListId = null;
    let brevoCampaignId = null;

    try {
      const { data: campaign, error: campaignError } = await supabase
        .from("newsletter_campaigns")
        .select("*")
        .eq("id", campaignId)
        .maybeSingle();

      if (campaignError) throw campaignError;
      if (!campaign) return res.status(404).json({ ok: false, message: "Campanha não encontrada." });
      if (campaign.status !== "draft") {
        return res.status(409).json({ ok: false, message: "Esta campanha já foi iniciada ou não está em rascunho." });
      }
      if (!campaign.html_content || campaign.html_content.trim().length < 11) {
        return res.status(422).json({ ok: false, message: "O conteúdo HTML da campanha está vazio ou é muito curto." });
      }

      const { data: reservation, error: reservationError } = await supabase
        .from("newsletter_campaigns")
        .update({ status: "preparing", created_by: req.newsletterAdminId })
        .eq("id", campaignId)
        .eq("status", "draft")
        .select("id")
        .maybeSingle();

      if (reservationError) throw reservationError;
      if (!reservation) {
        return res.status(409).json({ ok: false, message: "Outra solicitação já iniciou esta campanha." });
      }
      campaignWasReserved = true;

      let recipients = [];
      if (campaign.recipient_mode === "all") {
        const activeSubscribers = [];
        let offset = 0;
        let hasMore = true;

        while (hasMore) {
          const { data, error } = await supabase
            .from("newsletter_subscribers")
            .select("id, first_name, email, consent, subscription_status, brevo_contact_id")
            .eq("consent", true)
            .eq("subscription_status", "subscribed")
            .order("created_at", { ascending: false })
            .range(offset, offset + subscriberBatchSize - 1);
          if (error) throw error;

          const page = data || [];
          activeSubscribers.push(...page);
          hasMore = page.length === subscriberBatchSize;
          offset += subscriberBatchSize;
        }

        if (activeSubscribers.length) {
          const { error: clearError } = await supabase
            .from("newsletter_campaign_recipients")
            .delete()
            .eq("campaign_id", campaignId);
          if (clearError) throw clearError;

          for (const batch of chunk(activeSubscribers, subscriberBatchSize)) {
            const snapshotBatch = batch.map((subscriber) => ({
              campaign_id: campaignId,
              subscriber_id: subscriber.id,
              first_name_snapshot: subscriber.first_name,
              email_snapshot: subscriber.email,
              brevo_contact_id: subscriber.brevo_contact_id,
            }));
            const { data, error } = await supabase
              .from("newsletter_campaign_recipients")
              .insert(snapshotBatch)
              .select("id, subscriber_id");
            if (error) throw error;
            recipients.push(...(data || []));
          }
        }
      } else {
        const { data, error } = await supabase
          .from("newsletter_campaign_recipients")
          .select("id, subscriber_id")
          .eq("campaign_id", campaignId);
        if (error) throw error;
        recipients = data || [];
      }

      if (!recipients?.length) throw new Error("A campanha não tem destinatários selecionados.");

      const subscribersById = new Map();
      for (const batch of chunk(recipients.map((recipient) => recipient.subscriber_id), subscriberBatchSize)) {
        const { data, error } = await supabase
          .from("newsletter_subscribers")
          .select("id, first_name, email, consent, subscription_status, brevo_contact_id")
          .in("id", batch);
        if (error) throw error;
        for (const subscriber of data || []) subscribersById.set(subscriber.id, subscriber);
      }

      const eligibleRecipients = [];
      const ineligibleRecipients = [];
      for (const recipient of recipients) {
        const subscriber = subscribersById.get(recipient.subscriber_id);
        if (!subscriber || !subscriber.consent || subscriber.subscription_status !== "subscribed") {
          ineligibleRecipients.push(recipient);
        } else {
          eligibleRecipients.push({ recipient, subscriber });
        }
      }

      await Promise.all(ineligibleRecipients.map((recipient) =>
        updateRecipient(supabase, recipient.id, "skipped", "Inscrição inativa ou consentimento ausente."),
      ));

      if (!eligibleRecipients.length) throw new Error("Não há destinatários ativos e consentidos para esta campanha.");

      const brevo = createBrevoClient({ apiKey: env.BREVO_API_KEY });
      const folderId = Number(env.BREVO_CONTACTS_FOLDER_ID);
      if (!Number.isSafeInteger(folderId) || folderId < 1) {
        throw new Error("BREVO_CONTACTS_FOLDER_ID precisa ser um inteiro positivo.");
      }

      const { data: list } = await brevo.createList({
        folderId,
        name: `Newsletter ${campaignId.slice(0, 8)}`,
      });
      campaignListId = list?.id;
      if (!campaignListId) throw new Error("O Brevo não retornou o ID da lista da campanha.");

      await supabase
        .from("newsletter_campaigns")
        .update({ brevo_list_id: campaignListId, recipient_count: recipients.length })
        .eq("id", campaignId);

      const contactResults = await mapConcurrent(eligibleRecipients, contactConcurrency, async ({ recipient, subscriber }) => {
        try {
          const result = await syncBrevoContact(brevo, supabase, subscriber);
          if (result.unsubscribed) {
            await updateRecipient(supabase, recipient.id, "unsubscribed", "Contato descadastrado no Brevo.");
            return { recipient, contactId: null, error: null, skipped: true };
          }
          return { recipient, contactId: result.contactId, error: null, skipped: false };
        } catch (error) {
          const safeMessage = error instanceof BrevoApiError
            ? `Brevo retornou erro ${error.status}.`
            : "Não foi possível sincronizar este contato.";
          await supabase
            .from("newsletter_subscribers")
            .update({ brevo_sync_status: "failed", brevo_sync_error: safeMessage })
            .eq("id", subscriber.id);
          await updateRecipient(supabase, recipient.id, "failed", safeMessage);
          return { recipient, contactId: null, error: safeMessage, skipped: false };
        }
      });

      const readyContacts = contactResults.filter((result) => result.contactId);
      if (!readyContacts.length) throw new Error("Nenhum destinatário pôde ser sincronizado com o Brevo.");

      const failedByProviderId = new Set();
      for (const contactBatch of chunk(readyContacts, brevoListBatchSize)) {
        const { data } = await brevo.addContactsToList(
          campaignListId,
          contactBatch.map((contact) => contact.contactId),
        );
        for (const failedId of data?.failure || []) failedByProviderId.add(String(failedId));
      }

      const sendableContacts = readyContacts.filter((contact) => !failedByProviderId.has(String(contact.contactId)));
      const listFailures = readyContacts.filter((contact) => failedByProviderId.has(String(contact.contactId)));
      const contactFailureCount = contactResults.filter((result) => result.error).length;
      const skippedCount = ineligibleRecipients.length + contactResults.filter((result) => result.skipped).length;
      await Promise.all(listFailures.map(({ recipient }) =>
        updateRecipient(supabase, recipient.id, "failed", "O Brevo não adicionou o contato à lista da campanha."),
      ));

      if (!sendableContacts.length) throw new Error("O Brevo não aceitou nenhum destinatário para esta campanha.");

      const { data: providerCampaign } = await brevo.createCampaign({
        name: campaign.name,
        sender: { name: env.BREVO_SENDER_NAME, email: env.BREVO_SENDER_EMAIL },
        subject: campaign.subject,
        previewText: campaign.preview_text || undefined,
        htmlContent: campaign.html_content,
        recipients: { listIds: [campaignListId] },
      });
      brevoCampaignId = providerCampaign?.id;
      if (!brevoCampaignId) throw new Error("O Brevo não retornou o ID da campanha.");

      await supabase
        .from("newsletter_campaigns")
        .update({ brevo_campaign_id: brevoCampaignId })
        .eq("id", campaignId);

      await brevo.sendCampaignNow(brevoCampaignId);

      const { error: recipientUpdateError } = await supabase
        .from("newsletter_campaign_recipients")
        .update({ status: "queued", error_message: null })
        .in("id", sendableContacts.map(({ recipient }) => recipient.id));
      if (recipientUpdateError) throw recipientUpdateError;

      const { error: campaignUpdateError } = await supabase
        .from("newsletter_campaigns")
        .update({
          status: "sending",
          recipient_count: recipients.length,
          queued_count: sendableContacts.length,
          sent_count: 0,
          failed_count: contactFailureCount + listFailures.length,
        })
        .eq("id", campaignId);
      if (campaignUpdateError) throw campaignUpdateError;

      return res.json({
        ok: true,
        campaignId,
        brevoCampaignId,
        status: "sending",
        queuedRecipients: sendableContacts.length,
        skippedRecipients: skippedCount,
        failedRecipients: contactFailureCount + listFailures.length,
      });
    } catch (error) {
      if (campaignWasReserved) {
        const { error: updateError } = await supabase
          .from("newsletter_campaigns")
          .update({ status: "failed", brevo_campaign_id: brevoCampaignId || null })
          .eq("id", campaignId)
          .eq("status", "preparing");
        if (updateError) console.error("Não foi possível atualizar o status da campanha.");
      }

      if (campaignListId && !brevoCampaignId && env.BREVO_API_KEY) {
        try {
          await createBrevoClient({ apiKey: env.BREVO_API_KEY }).deleteList(campaignListId);
        } catch {
          // Preserve the original campaign error.
        }
      }

      if (error instanceof BrevoApiError) {
        const status = error.status === 402 ? 402 : 502;
        return res.status(status).json({ ok: false, message: getSafeErrorMessage(error) });
      }
      if (!campaignWasReserved) {
        return res.status(500).json({ ok: false, message: "Não foi possível iniciar a campanha." });
      }
      return res.status(422).json({ ok: false, message: error.message || "Não foi possível processar a campanha." });
    }
  });

  return router;
}
