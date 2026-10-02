import assert from "node:assert/strict";
import { once } from "node:events";
import express from "express";
import test from "node:test";
import { BrevoApiError, createBrevoApi } from "./brevoApi.js";
import { createNewsletterRouter } from "./newsletterRoutes.js";

const campaignId = "11111111-1111-4111-8111-111111111111";
const adminUser = { id: "admin-1", app_metadata: { role: "admin" } };
const env = {
  SUPABASE_URL: "https://supabase.example",
  SUPABASE_ANON_KEY: "anon-test-key",
  SUPABASE_SERVICE_ROLE_KEY: "service-role-test-key",
  BREVO_WEBHOOK_TOKEN: "webhook-test-token",
  BREVO_API_KEY: "brevo-test-key",
  BREVO_CONTACTS_FOLDER_ID: "10",
  BREVO_SENDER_EMAIL: "newsletter@example.com",
  BREVO_SENDER_NAME: "Newsletter",
};

test("Brevo client sends credentials only in the server-side API header", async () => {
  let requestUrl = "";
  let requestOptions = null;
  const brevo = createBrevoApi({
    apiKey: "server-only-test-key",
    fetchImpl: async (url, options) => {
      requestUrl = url;
      requestOptions = options;
      return new Response(null, { status: 204 });
    },
  });

  const response = await brevo.sendCampaignNow(55);

  assert.equal(response.status, 204);
  assert.equal(requestUrl, "https://api.brevo.com/v3/emailCampaigns/55/sendNow");
  assert.equal(requestOptions.method, "POST");
  assert.equal(requestOptions.headers["api-key"], "server-only-test-key");
  assert.equal(requestOptions.body, undefined);
});

test("Brevo client preserves provider status codes without exposing the API key", async () => {
  const brevo = createBrevoApi({
    apiKey: "server-only-test-key",
    fetchImpl: async () => new Response(JSON.stringify({ code: "not_enough_credits", message: "Insufficient credits" }), {
      status: 402,
      headers: { "content-type": "application/json" },
    }),
  });

  await assert.rejects(
    () => brevo.createCampaign({ subject: "Teste" }),
    (error) => error instanceof BrevoApiError
      && error.status === 402
      && error.code === "not_enough_credits"
      && !error.message.includes("server-only-test-key"),
  );
});

function createFakeSupabase() {
  const state = {
    campaign: {
      id: campaignId,
      name: "Campanha de teste",
      subject: "Novidades",
      preview_text: "Veja as novidades",
      html_content: "<p>Conteúdo da campanha.</p>",
      recipient_mode: "selected",
      status: "draft",
      brevo_campaign_id: 55,
      recipient_count: 0,
      sent_count: 0,
      failed_count: 0,
    },
    recipients: [{ id: "recipient-1", campaign_id: campaignId, subscriber_id: "subscriber-1", email_snapshot: "ana@example.com", status: "pending" }],
    subscribers: [{
      id: "subscriber-1",
      first_name: "Ana",
      email: "ana@example.com",
      consent: true,
      subscription_status: "subscribed",
      brevo_contact_id: null,
    }],
    rpcCalls: [],
  };

  function from(table) {
    let operation = "select";
    let values = null;
    let range = null;
    const filters = [];
    const records = table === "newsletter_campaigns"
      ? [state.campaign]
      : table === "newsletter_campaign_recipients"
        ? state.recipients
        : state.subscribers;

    function matches(record) {
      return filters.every((filter) => filter.type === "eq"
        ? record[filter.column] === filter.value
        : filter.type === "neq"
          ? record[filter.column] !== filter.value
          : filter.values.includes(record[filter.column]));
    }

    function execute(single = false) {
      let found = records.filter(matches);
      if (operation === "select") {
        if (range) found = found.slice(range[0], range[1] + 1);
        return { data: single ? found[0] || null : found, error: null };
      }
      if (operation === "insert") {
        const inserted = (Array.isArray(values) ? values : [values]).map((record, index) => ({
          id: `recipient-${records.length + index + 1}`,
          ...record,
        }));
        records.push(...inserted);
        return { data: inserted, error: null };
      }
      if (operation === "delete") {
        for (let index = records.length - 1; index >= 0; index -= 1) {
          if (matches(records[index])) records.splice(index, 1);
        }
        return { data: found, error: null };
      }
      for (const record of found) Object.assign(record, values);
      return { data: single ? found[0] || null : found, error: null };
    }

    const query = {
      select() {
        return query;
      },
      update(nextValues) {
        operation = "update";
        values = nextValues;
        return query;
      },
      insert(nextValues) {
        operation = "insert";
        values = nextValues;
        return query;
      },
      delete() {
        operation = "delete";
        return query;
      },
      eq(column, value) {
        filters.push({ type: "eq", column, value });
        return query;
      },
      neq(column, value) {
        filters.push({ type: "neq", column, value });
        return query;
      },
      in(column, nextValues) {
        filters.push({ type: "in", column, values: nextValues });
        return query;
      },
      order() {
        return query;
      },
      range(from, to) {
        range = [from, to];
        return query;
      },
      maybeSingle() {
        return Promise.resolve(execute(true));
      },
      then(resolve, reject) {
        return Promise.resolve(execute()).then(resolve, reject);
      },
    };

    return query;
  }

  return {
    state,
    client: {
      auth: { getUser: async () => ({ data: { user: adminUser }, error: null }) },
      from,
      rpc: async (name, args) => {
        state.rpcCalls.push({ name, args });
        return { data: true, error: null };
      },
    },
  };
}

async function requestApp(app, path, options = {}) {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const { port } = server.address();

  try {
    return await fetch(`http://127.0.0.1:${port}${path}`, options);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test("newsletter API rejects requests without a bearer token", async () => {
  const app = express();
  app.use("/api/newsletter", createNewsletterRouter({ env }));
  const response = await requestApp(app, "/api/newsletter/brevo/status");

  assert.equal(response.status, 401);
  assert.equal((await response.json()).ok, false);
});

test("newsletter API rejects authenticated non-admin users", async () => {
  const app = express();
  app.use("/api/newsletter", createNewsletterRouter({
    env,
    createSupabaseClient: () => ({
      auth: {
        getUser: async () => ({
          data: { user: { id: "user-1", app_metadata: { role: "user" } }, error: null },
        }),
      },
    }),
  }));
  const response = await requestApp(app, "/api/newsletter/brevo/status", {
    headers: { authorization: "Bearer valid-test-token" },
  });

  assert.equal(response.status, 403);
});

test("admin can send a campaign to active consented subscribers", async () => {
  const app = express();
  const database = createFakeSupabase();
  const brevoCalls = [];
  app.use("/api/newsletter", createNewsletterRouter({
    env,
    createSupabaseClient: () => database.client,
    createBrevoClient: () => ({
      getContact: async () => ({ data: { id: 701, emailBlacklisted: false } }),
      updateContact: async (...args) => brevoCalls.push(["updateContact", ...args]),
      createContact: async () => { throw new Error("Existing contact should not be created again."); },
      createList: async (payload) => {
        brevoCalls.push(["createList", payload]);
        return { data: { id: 91 } };
      },
      addContactsToList: async (listId, ids) => {
        brevoCalls.push(["addContactsToList", listId, ids]);
        return { data: { success: ids, failure: [] } };
      },
      createCampaign: async (payload) => {
        brevoCalls.push(["createCampaign", payload]);
        return { data: { id: 55 } };
      },
      sendCampaignNow: async (id) => brevoCalls.push(["sendCampaignNow", id]),
      deleteList: async (id) => brevoCalls.push(["deleteList", id]),
    }),
  }));

  const response = await requestApp(app, `/api/newsletter/campaigns/${campaignId}/send`, {
    method: "POST",
    headers: { authorization: "Bearer valid-test-token" },
  });
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.equal(result.status, "sending");
  assert.equal(result.queuedRecipients, 1);
  assert.equal(database.state.campaign.status, "sending");
  assert.equal(database.state.campaign.brevo_campaign_id, 55);
  assert.equal(database.state.campaign.queued_count, 1);
  assert.equal(database.state.campaign.sent_count, 0);
  assert.equal(database.state.recipients[0].status, "queued");
  assert.ok(brevoCalls.some(([name]) => name === "sendCampaignNow"));
});

test("campaign skips and locally unsubscribes a contact blocked by Brevo", async () => {
  const app = express();
  const database = createFakeSupabase();
  let sendWasCalled = false;
  app.use("/api/newsletter", createNewsletterRouter({
    env,
    createSupabaseClient: () => database.client,
    createBrevoClient: () => ({
      getContact: async () => ({ data: { id: 701, emailBlacklisted: true } }),
      updateContact: async () => {},
      createContact: async () => { throw new Error("Blocked contact must not be recreated."); },
      createList: async () => ({ data: { id: 91 } }),
      addContactsToList: async () => { throw new Error("Blocked contact must not be added to a list."); },
      createCampaign: async () => { throw new Error("Campaign must not be created without recipients."); },
      sendCampaignNow: async () => { sendWasCalled = true; },
      deleteList: async () => {},
    }),
  }));

  const response = await requestApp(app, `/api/newsletter/campaigns/${campaignId}/send`, {
    method: "POST",
    headers: { authorization: "Bearer valid-test-token" },
  });

  assert.equal(response.status, 422);
  assert.equal(database.state.subscribers[0].subscription_status, "unsubscribed");
  assert.equal(database.state.recipients[0].status, "unsubscribed");
  assert.equal(sendWasCalled, false);
});

test("all-recipient campaign snapshots only subscribers with active consent at send time", async () => {
  const app = express();
  const database = createFakeSupabase();
  database.state.campaign.recipient_mode = "all";
  database.state.recipients = [];
  database.state.subscribers.push({
    id: "subscriber-unsubscribed",
    first_name: "Beto",
    email: "beto@example.com",
    consent: false,
    subscription_status: "unsubscribed",
    brevo_contact_id: null,
  });
  app.use("/api/newsletter", createNewsletterRouter({
    env,
    createSupabaseClient: () => database.client,
    createBrevoClient: () => ({
      getContact: async () => ({ data: { id: 701, emailBlacklisted: false } }),
      createContact: async () => { throw new Error("Existing contact should not be created again."); },
      updateContact: async () => {},
      createList: async () => ({ data: { id: 91 } }),
      addContactsToList: async (_listId, ids) => ({ data: { success: ids, failure: [] } }),
      createCampaign: async () => ({ data: { id: 55 } }),
      sendCampaignNow: async () => {},
      deleteList: async () => {},
    }),
  }));

  const response = await requestApp(app, `/api/newsletter/campaigns/${campaignId}/send`, {
    method: "POST",
    headers: { authorization: "Bearer valid-test-token" },
  });
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.equal(result.queuedRecipients, 1);
  assert.equal(database.state.recipients.length, 1);
  assert.equal(database.state.recipients[0].subscriber_id, "subscriber-1");
  assert.equal(database.state.recipients[0].status, "queued");
});

test("Brevo marketing webhook requires its bearer token and applies events idempotently", async () => {
  const app = express();
  const database = createFakeSupabase();
  app.use(express.json());
  app.use("/api/newsletter", createNewsletterRouter({
    env,
    createSupabaseClient: () => database.client,
  }));
  const event = {
    event: "delivered",
    email: "ana@example.com",
    camp_id: 55,
    ts_event: 1760000000,
  };

  const unauthorized = await requestApp(app, "/api/newsletter/webhooks/brevo", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(event),
  });
  assert.equal(unauthorized.status, 401);

  const response = await requestApp(app, "/api/newsletter/webhooks/brevo", {
    method: "POST",
    headers: {
      authorization: "Bearer webhook-test-token",
      "content-type": "application/json",
    },
    body: JSON.stringify(event),
  });
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.equal(result.processed, 1);
  assert.equal(database.state.rpcCalls.length, 1);
  assert.equal(database.state.rpcCalls[0].name, "apply_newsletter_provider_event");
  assert.equal(database.state.rpcCalls[0].args.p_event_type, "delivered");
  assert.equal(database.state.rpcCalls[0].args.p_campaign_id, campaignId);
});
