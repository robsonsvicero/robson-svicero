import {
  createServiceClient,
  getRequestToken,
  jsonResponse,
} from "../_shared/newsletter.ts";

const acceptedEvents = new Set([
  "delivered",
  "hardbounce",
  "hard_bounce",
  "softbounce",
  "soft_bounce",
  "spam",
  "unsubscribe",
  "unsubscribed",
  "opened",
  "uniqueopened",
  "unique_opened",
  "click",
  "clicked",
]);

function normalizeEvent(value: unknown): string | null {
  const normalized = String(value || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (!acceptedEvents.has(normalized)) return null;
  if (normalized === "hardbounce") return "hard_bounce";
  if (normalized === "softbounce") return "soft_bounce";
  if (normalized === "unsubscribed") return "unsubscribe";
  if (normalized === "clicked") return "click";
  if (normalized === "unique_opened" || normalized === "uniqueopened") return "opened";
  return normalized;
}

function timestamp(payload: Record<string, unknown>): string {
  const epoch = Number(payload.ts_event ?? payload.ts);
  if (Number.isFinite(epoch) && epoch > 0) return new Date(epoch * 1000).toISOString();
  const date = new Date(String(payload.date_event || payload.date || ""));
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function constantTimeEquals(left: string, right: string): boolean {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  if (leftBytes.length !== rightBytes.length || leftBytes.length === 0) return false;
  let difference = 0;
  for (let index = 0; index < leftBytes.length; index += 1) difference |= leftBytes[index] ^ rightBytes[index];
  return difference === 0;
}

async function eventKey(campaignId: string, email: string, eventType: string, occurredAt: string, link: string): Promise<string> {
  const value = [campaignId, email, eventType, occurredAt, link].join("\u0000");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method !== "POST") return new Response("Method not allowed.", { status: 405 });

  const expectedToken = Deno.env.get("BREVO_WEBHOOK_TOKEN") || "";
  const receivedToken = getRequestToken(request);
  if (!constantTimeEquals(receivedToken, expectedToken)) {
    return new Response("Unauthorized.", { status: 401 });
  }

  let payloads: unknown;
  try {
    const payload = await request.json();
    payloads = Array.isArray(payload) ? payload : [payload];
  } catch {
    return new Response("Invalid JSON body.", { status: 400 });
  }
  if (!Array.isArray(payloads) || payloads.length > 500) {
    return new Response("Invalid event batch.", { status: 413 });
  }

  try {
    const supabase = createServiceClient();
    let processed = 0;
    let duplicates = 0;
    let ignored = 0;

    for (const value of payloads) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        ignored += 1;
        continue;
      }
      const payload = value as Record<string, unknown>;
      const eventType = normalizeEvent(payload.event);
      const email = String(payload.email || "").trim().toLowerCase();
      const providerCampaignId = Number(payload.camp_id);
      if (!eventType || !email || !Number.isSafeInteger(providerCampaignId) || providerCampaignId < 1) {
        ignored += 1;
        continue;
      }

      const { data: campaign, error: campaignError } = await supabase
        .from("newsletter_campaigns")
        .select("id")
        .eq("brevo_campaign_id", providerCampaignId)
        .maybeSingle();
      if (campaignError) throw campaignError;
      if (!campaign) {
        ignored += 1;
        continue;
      }

      const { data: recipient, error: recipientError } = await supabase
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

      const occurredAt = timestamp(payload);
      const key = await eventKey(campaign.id, email, eventType, occurredAt, String(payload.URL || ""));
      const { data, error } = await supabase.rpc("apply_newsletter_provider_event", {
        p_event_key: key,
        p_campaign_id: campaign.id,
        p_recipient_id: recipient.id,
        p_subscriber_id: recipient.subscriber_id,
        p_event_type: eventType,
        p_occurred_at: occurredAt,
      });
      if (error) throw error;
      if (data) processed += 1;
      else duplicates += 1;
    }

    return Response.json({ ok: true, processed, duplicates, ignored });
  } catch {
    return new Response("Unable to process webhook events.", { status: 500 });
  }
});
