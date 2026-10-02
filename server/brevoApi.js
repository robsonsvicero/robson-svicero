const BREVO_API_BASE_URL = "https://api.brevo.com/v3";

export class BrevoApiError extends Error {
  constructor(status, message, code = "") {
    super(message || "A solicitação ao Brevo falhou.");
    this.name = "BrevoApiError";
    this.status = status;
    this.code = code;
  }
}

export function createBrevoApi({ apiKey, fetchImpl = globalThis.fetch }) {
  if (!apiKey) throw new Error("BREVO_API_KEY não configurada.");
  if (typeof fetchImpl !== "function") throw new Error("Fetch não está disponível neste servidor.");

  async function request(path, { method = "GET", body } = {}) {
    const response = await fetchImpl(`${BREVO_API_BASE_URL}${path}`, {
      method,
      headers: {
        "api-key": apiKey,
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const responseText = await response.text();
    let responseBody = null;
    if (responseText) {
      try {
        responseBody = JSON.parse(responseText);
      } catch {
        responseBody = null;
      }
    }

    if (!response.ok) {
      throw new BrevoApiError(
        response.status,
        responseBody?.message || "A solicitação ao Brevo falhou.",
        responseBody?.code || "",
      );
    }

    return { status: response.status, data: responseBody };
  }

  return {
    getContact(identifier) {
      return request(`/contacts/${encodeURIComponent(identifier)}`);
    },
    createContact(payload) {
      return request("/contacts", { method: "POST", body: payload });
    },
    updateContact(identifier, payload) {
      return request(`/contacts/${encodeURIComponent(identifier)}`, { method: "PUT", body: payload });
    },
    createList(payload) {
      return request("/contacts/lists", { method: "POST", body: payload });
    },
    addContactsToList(listId, ids) {
      return request(`/contacts/lists/${encodeURIComponent(listId)}/contacts/add`, {
        method: "POST",
        body: { ids },
      });
    },
    deleteList(listId) {
      return request(`/contacts/lists/${encodeURIComponent(listId)}`, { method: "DELETE" });
    },
    createCampaign(payload) {
      return request("/emailCampaigns", { method: "POST", body: payload });
    },
    sendCampaignNow(campaignId) {
      return request(`/emailCampaigns/${encodeURIComponent(campaignId)}/sendNow`, { method: "POST" });
    },
  };
}
