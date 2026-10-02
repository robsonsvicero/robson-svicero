import { createClient } from "npm:@supabase/supabase-js@2";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const subscriberBatchSize = 400;
export const contactConcurrency = 5;
export const brevoListBatchSize = 500;

export function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export function getRequestToken(request: Request): string {
  return request.headers.get("Authorization")?.match(/^Bearer\s+(.+)$/i)?.[1] || "";
}

function getNamedKey(variableName: string, legacyNames: string[] = []): string {
  try {
    const keys = JSON.parse(Deno.env.get(variableName) || "{}") as Record<string, string>;
    if (keys.default) return keys.default;
  } catch {
    return "";
  }
  for (const name of legacyNames) {
    const value = Deno.env.get(name);
    if (value) return value;
  }
  return "";
}

function getSupabaseUrl(): string {
  return Deno.env.get("SUPABASE_URL") || "";
}

function getPublishableKey(): string {
  return getNamedKey("SUPABASE_PUBLISHABLE_KEYS", [
    "SUPABASE_ANON_KEY",
    "SUPABASE_PUBLISHABLE_KEY",
  ]);
}

export function createServiceClient() {
  const url = getSupabaseUrl();
  const secretKey = getNamedKey("SUPABASE_SECRET_KEYS", [
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEY",
  ]);
  if (!url || !secretKey) throw new Error("Supabase service credentials are not configured.");
  return createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}

export async function requireAdmin(token: string) {
  const url = getSupabaseUrl();
  const publishableKey = getPublishableKey();
  if (!url || !publishableKey) {
    return { user: null, status: 503, message: "Supabase authentication is not configured." };
  }
  if (!token) return { user: null, status: 401, message: "Authentication is required." };

  const client = createClient(url, publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return { user: null, status: 401, message: "The session is invalid or expired." };
  if (data.user.app_metadata?.role !== "admin") {
    return { user: null, status: 403, message: "Administrative access is required." };
  }
  return { user: data.user, status: 200, message: "" };
}

export class BrevoApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, message: string, code = "") {
    super(message || "The Brevo request failed.");
    this.name = "BrevoApiError";
    this.status = status;
    this.code = code;
  }
}

export function createBrevoApi() {
  const apiKey = Deno.env.get("BREVO_API_KEY") || "";
  if (!apiKey) throw new Error("BREVO_API_KEY is not configured.");

  async function request(path: string, init: { method?: string; body?: Record<string, unknown> } = {}) {
    const response = await fetch(`https://api.brevo.com/v3${path}`, {
      method: init.method || "GET",
      headers: {
        "api-key": apiKey,
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
      },
      ...(init.body ? { body: JSON.stringify(init.body) } : {}),
    });
    const text = await response.text();
    let data: Record<string, unknown> | null = null;
    if (text) {
      try {
        data = JSON.parse(text) as Record<string, unknown>;
      } catch {
        data = null;
      }
    }
    if (!response.ok) {
      throw new BrevoApiError(
        response.status,
        typeof data?.message === "string" ? data.message : "The Brevo request failed.",
        typeof data?.code === "string" ? data.code : "",
      );
    }
    return { status: response.status, data };
  }

  return {
    getContact(identifier: string) {
      return request(`/contacts/${encodeURIComponent(identifier)}`);
    },
    createContact(payload: Record<string, unknown>) {
      return request("/contacts", { method: "POST", body: payload });
    },
    updateContact(identifier: string, payload: Record<string, unknown>) {
      return request(`/contacts/${encodeURIComponent(identifier)}`, { method: "PUT", body: payload });
    },
    createList(payload: Record<string, unknown>) {
      return request("/contacts/lists", { method: "POST", body: payload });
    },
    addContactsToList(listId: number, ids: number[]) {
      return request(`/contacts/lists/${listId}/contacts/add`, { method: "POST", body: { ids } });
    },
    deleteList(listId: number) {
      return request(`/contacts/lists/${listId}`, { method: "DELETE" });
    },
    createCampaign(payload: Record<string, unknown>) {
      return request("/emailCampaigns", { method: "POST", body: payload });
    },
    sendCampaignNow(campaignId: number) {
      return request(`/emailCampaigns/${campaignId}/sendNow`, { method: "POST" });
    },
  };
}

export function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let offset = 0; offset < items.length; offset += size) {
    result.push(items.slice(offset, offset + size));
  }
  return result;
}

export async function mapConcurrent<T, R>(items: T[], limit: number, mapper: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index]);
    }
  }));
  return results;
}
