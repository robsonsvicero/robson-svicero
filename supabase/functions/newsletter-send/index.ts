import {
  BrevoApiError,
  brevoListBatchSize,
  chunk,
  corsHeaders,
  contactConcurrency,
  createBrevoApi,
  createServiceClient,
  getRequestToken,
  jsonResponse,
  mapConcurrent,
  requireAdmin,
  subscriberBatchSize,
} from "../_shared/newsletter.ts";

function getFolderId(): number {
  const folderId = Number(Deno.env.get("BREVO_CONTACTS_FOLDER_ID"));
  if (!Number.isSafeInteger(folderId) || folderId < 1) {
    throw new Error("BREVO_CONTACTS_FOLDER_ID must be a positive integer.");
  }
  return folderId;
}

function personalizeNameToken(value: string): string {
  return value.replaceAll("{nome_cadastro}", "{{ contact.FNAME }}");
}

function getSafeErrorMessage(error: unknown): string {
  if (error instanceof BrevoApiError) {
    return `Brevo returned error ${error.status}${error.code ? ` (${error.code})` : ""}.`;
  }
  return error instanceof Error ? error.message : "The campaign could not be processed.";
}

async function getBrevoContact(brevo: ReturnType<typeof createBrevoApi>, identifier: string | number) {
  try {
    const { data } = await brevo.getContact(String(identifier));
    return data;
  } catch (error) {
    if (error instanceof BrevoApiError && error.status === 404) return null;
    throw error;
  }
}

async function syncBrevoContact(supabase: ReturnType<typeof createServiceClient>, brevo: ReturnType<typeof createBrevoApi>, subscriber: Record<string, unknown>) {
  let contact = subscriber.brevo_contact_id
    ? await getBrevoContact(brevo, subscriber.brevo_contact_id as number)
    : null;
  const email = String(subscriber.email);
  if (!contact) contact = await getBrevoContact(brevo, email);

  if (!contact) {
    try {
      const { data } = await brevo.createContact({
        email,
        attributes: { FNAME: subscriber.first_name },
      });
      contact = data?.id ? { id: data.id, emailBlacklisted: false } : null;
    } catch (error) {
      if (!(error instanceof BrevoApiError) || error.status !== 400) throw error;
      contact = await getBrevoContact(brevo, email);
      if (!contact) throw error;
    }
  } else if (subscriber.first_name) {
    await brevo.updateContact(String(contact.id), {
      attributes: { FNAME: subscriber.first_name },
    });
  }

  if (!contact?.id) contact = await getBrevoContact(brevo, email);
  if (!contact?.id) throw new Error("Brevo did not return the contact ID.");

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
    return { contactId: Number(contact.id), unsubscribed: true };
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
  return { contactId: Number(contact.id), unsubscribed: false };
}

async function updateRecipient(supabase: ReturnType<typeof createServiceClient>, recipientId: string, status: string, errorMessage: string | null = null) {
  return supabase
    .from("newsletter_campaign_recipients")
    .update({ status, error_message: errorMessage })
    .eq("id", recipientId);
}

async function sendCampaign(campaignId: string, adminId: string) {
  const supabase = createServiceClient();
  const { data: campaign, error: campaignError } = await supabase
    .from("newsletter_campaigns")
    .select("*")
    .eq("id", campaignId)
    .maybeSingle();
  if (campaignError) throw campaignError;
  if (!campaign) return { error: "Campaign not found.", status: 404 };
  if (campaign.status !== "draft") return { error: "Campaign is no longer a draft.", status: 409 };
  if (!campaign.html_content || campaign.html_content.trim().length < 11) {
    return { error: "Campaign content is empty or too short.", status: 422 };
  }

  const { data: reservation, error: reservationError } = await supabase
    .from("newsletter_campaigns")
    .update({ status: "preparing", created_by: adminId })
    .eq("id", campaignId)
    .eq("status", "draft")
    .select("id")
    .maybeSingle();
  if (reservationError) throw reservationError;
  if (!reservation) return { error: "Another request already started this campaign.", status: 409 };

  let campaignListId: number | null = null;
  let providerCampaignId: number | null = null;
  let failureStage = "Preparando destinatários";

  try {
    const recipients: Array<Record<string, unknown>> = [];
    if (campaign.recipient_mode === "all") {
      const activeSubscribers: Array<Record<string, unknown>> = [];
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

      const { error: clearError } = await supabase
        .from("newsletter_campaign_recipients")
        .delete()
        .eq("campaign_id", campaignId);
      if (clearError) throw clearError;

      for (const batch of chunk(activeSubscribers, subscriberBatchSize)) {
        const snapshots = batch.map((subscriber) => ({
          campaign_id: campaignId,
          subscriber_id: subscriber.id,
          first_name_snapshot: subscriber.first_name,
          email_snapshot: subscriber.email,
          brevo_contact_id: subscriber.brevo_contact_id,
        }));
        const { data, error } = await supabase
          .from("newsletter_campaign_recipients")
          .insert(snapshots)
          .select("id, subscriber_id");
        if (error) throw error;
        recipients.push(...(data || []));
      }
    } else {
      const { data, error } = await supabase
        .from("newsletter_campaign_recipients")
        .select("id, subscriber_id")
        .eq("campaign_id", campaignId);
      if (error) throw error;
      recipients.push(...(data || []));
    }
    if (!recipients.length) throw new Error("The campaign has no recipients.");

    const subscriberIds = recipients.map((recipient) => String(recipient.subscriber_id));
    const subscribers = new Map<string, Record<string, unknown>>();
    for (const batch of chunk(subscriberIds, subscriberBatchSize)) {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("id, first_name, email, consent, subscription_status, brevo_contact_id")
        .in("id", batch);
      if (error) throw error;
      for (const subscriber of data || []) subscribers.set(String(subscriber.id), subscriber);
    }

    const eligible: Array<{ recipient: Record<string, unknown>; subscriber: Record<string, unknown> }> = [];
    const ineligible: Array<Record<string, unknown>> = [];
    for (const recipient of recipients) {
      const subscriber = subscribers.get(String(recipient.subscriber_id));
      if (!subscriber || !subscriber.consent || subscriber.subscription_status !== "subscribed") {
        ineligible.push(recipient);
      } else {
        eligible.push({ recipient, subscriber });
      }
    }
    await Promise.all(ineligible.map((recipient) => updateRecipient(supabase, String(recipient.id), "skipped", "Consent is missing or subscription is inactive.")));
    if (!eligible.length) throw new Error("No active, consented recipients are available.");

    const brevo = createBrevoApi();
    const folderId = getFolderId();
    failureStage = "Criando lista de contatos no Brevo";
    const { data: list } = await brevo.createList({
      folderId,
      name: `Newsletter ${campaignId.slice(0, 8)}`,
    });
    campaignListId = Number(list?.id);
    if (!campaignListId) throw new Error("Brevo did not return a campaign list ID.");
    await supabase
      .from("newsletter_campaigns")
      .update({ brevo_list_id: campaignListId, recipient_count: recipients.length })
      .eq("id", campaignId);

    failureStage = "Sincronizando contatos no Brevo";
    const contactResults = await mapConcurrent(eligible, contactConcurrency, async ({ recipient, subscriber }) => {
      try {
        const result = await syncBrevoContact(supabase, brevo, subscriber);
        if (result.unsubscribed) {
          await updateRecipient(supabase, String(recipient.id), "unsubscribed", "Contact is unsubscribed in Brevo.");
          return { recipient, contactId: null as number | null, error: null as string | null, skipped: true };
        }
        return { recipient, contactId: result.contactId as number | null, error: null as string | null, skipped: false };
      } catch (error) {
        const safeMessage = error instanceof BrevoApiError ? `Brevo returned error ${error.status}.` : "Contact synchronization failed.";
        await supabase
          .from("newsletter_subscribers")
          .update({ brevo_sync_status: "failed", brevo_sync_error: safeMessage })
          .eq("id", subscriber.id);
        await updateRecipient(supabase, String(recipient.id), "failed", safeMessage);
        return { recipient, contactId: null as number | null, error: safeMessage, skipped: false };
      }
    });

    const ready = contactResults.filter((result) => result.contactId !== null);
    if (!ready.length) throw new Error("No contacts could be synchronized with Brevo.");
    const failedIds = new Set<string>();
    failureStage = "Adicionando contatos à lista do Brevo";
    for (const batch of chunk(ready, brevoListBatchSize)) {
      const { data } = await brevo.addContactsToList(campaignListId, batch.map((result) => Number(result.contactId)));
      for (const id of Array.isArray(data?.failure) ? data.failure : []) failedIds.add(String(id));
    }
    const sendable = ready.filter((result) => !failedIds.has(String(result.contactId)));
    const listFailures = ready.filter((result) => failedIds.has(String(result.contactId)));
    const syncFailures = contactResults.filter((result) => result.error).length;
    const skippedCount = ineligible.length + contactResults.filter((result) => result.skipped).length;
    await Promise.all(listFailures.map(({ recipient }) => updateRecipient(supabase, String(recipient.id), "failed", "Brevo could not add the contact to the campaign list.")));
    if (!sendable.length) throw new Error("Brevo did not accept any recipients.");

    const senderEmail = Deno.env.get("BREVO_SENDER_EMAIL") || "";
    const senderName = Deno.env.get("BREVO_SENDER_NAME") || "";
    if (!senderEmail || !senderName) throw new Error("Brevo sender is not configured.");
    failureStage = "Criando campanha no Brevo";
    const { data: providerCampaign } = await brevo.createCampaign({
      name: campaign.name,
      sender: { name: senderName, email: senderEmail },
      subject: personalizeNameToken(campaign.subject),
      previewText: campaign.preview_text ? personalizeNameToken(campaign.preview_text) : undefined,
      htmlContent: personalizeNameToken(campaign.html_content),
      recipients: { listIds: [campaignListId] },
    });
    providerCampaignId = Number(providerCampaign?.id);
    if (!providerCampaignId) throw new Error("Brevo did not return the campaign ID.");
    await supabase.from("newsletter_campaigns").update({ brevo_campaign_id: providerCampaignId }).eq("id", campaignId);
    failureStage = "Solicitando o envio ao Brevo";
    await brevo.sendCampaignNow(providerCampaignId);

    const { error: recipientError } = await supabase
      .from("newsletter_campaign_recipients")
      .update({ status: "queued", error_message: null })
      .in("id", sendable.map((result) => result.recipient.id));
    if (recipientError) throw recipientError;
    const { error: campaignError } = await supabase
      .from("newsletter_campaigns")
      .update({
        status: "sending",
        recipient_count: recipients.length,
        queued_count: sendable.length,
        sent_count: 0,
        failed_count: syncFailures + listFailures.length,
      })
      .eq("id", campaignId);
    if (campaignError) throw campaignError;

    return {
      data: {
        ok: true,
        campaignId,
        brevoCampaignId: providerCampaignId,
        status: "sending",
        queuedRecipients: sendable.length,
        skippedRecipients: skippedCount,
        failedRecipients: syncFailures + listFailures.length,
      },
      status: 200,
    };
  } catch (error) {
    const failureReason = `${failureStage}: ${getSafeErrorMessage(error)}`;
    console.error("[newsletter-send] Campaign failed", { campaignId, failureReason });
    if (providerCampaignId) {
      await supabase.from("newsletter_campaigns").update({ brevo_campaign_id: providerCampaignId }).eq("id", campaignId);
    }
    await supabase.from("newsletter_campaigns").update({ status: "failed", failure_reason: failureReason }).eq("id", campaignId).eq("status", "preparing");
    if (campaignListId && !providerCampaignId) {
      try {
        await createBrevoApi().deleteList(campaignListId);
      } catch {
        // Preserve the original failure.
      }
    }
    const status = error instanceof BrevoApiError ? (error.status === 402 ? 402 : 502) : 422;
    return { error: failureReason, status };
  }
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  const token = getRequestToken(request);
  const auth = await requireAdmin(token);
  if (!auth.user) return jsonResponse({ error: auth.message }, auth.status);

  let body: { campaignId?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }
  const campaignId = String(body.campaignId || "");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(campaignId)) {
    return jsonResponse({ error: "Invalid campaign ID." }, 400);
  }

  try {
    const result = await sendCampaign(campaignId, auth.user.id);
    if (result.error) return jsonResponse({ error: result.error }, result.status);
    return jsonResponse(result.data || {}, result.status);
  } catch {
    return jsonResponse({ error: "The campaign could not be started." }, 500);
  }
});
