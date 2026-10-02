alter table public.newsletter_subscribers
  add column if not exists subscription_status text not null default 'subscribed',
  add column if not exists unsubscribed_at timestamptz,
  add column if not exists brevo_contact_id bigint,
  add column if not exists brevo_sync_status text not null default 'pending',
  add column if not exists brevo_synced_at timestamptz,
  add column if not exists brevo_sync_error text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.newsletter_subscribers'::regclass
      and conname = 'newsletter_subscribers_subscription_status_check'
  ) then
    alter table public.newsletter_subscribers
      add constraint newsletter_subscribers_subscription_status_check
      check (subscription_status in ('subscribed', 'unsubscribed', 'bounced', 'complained'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.newsletter_subscribers'::regclass
      and conname = 'newsletter_subscribers_unsubscribed_at_check'
  ) then
    alter table public.newsletter_subscribers
      add constraint newsletter_subscribers_unsubscribed_at_check
      check ((subscription_status = 'unsubscribed') = (unsubscribed_at is not null));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.newsletter_subscribers'::regclass
      and conname = 'newsletter_subscribers_brevo_sync_status_check'
  ) then
    alter table public.newsletter_subscribers
      add constraint newsletter_subscribers_brevo_sync_status_check
      check (brevo_sync_status in ('pending', 'synced', 'failed'));
  end if;
end $$;

create unique index if not exists newsletter_subscribers_brevo_contact_unique
  on public.newsletter_subscribers (brevo_contact_id)
  where brevo_contact_id is not null;

create index if not exists newsletter_subscribers_sync_queue_idx
  on public.newsletter_subscribers (brevo_sync_status, created_at)
  where subscription_status = 'subscribed';

create table if not exists public.newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 160),
  subject text not null check (char_length(btrim(subject)) between 1 and 250),
  preview_text text,
  html_content text not null,
  recipient_mode text not null check (recipient_mode in ('all', 'selected')),
  status text not null default 'draft'
    check (status in ('draft', 'preparing', 'scheduled', 'sending', 'sent', 'failed', 'cancelled')),
  brevo_campaign_id bigint,
  brevo_list_id bigint,
  recipient_count integer not null default 0 check (recipient_count >= 0),
  queued_count integer not null default 0 check (queued_count >= 0),
  sent_count integer not null default 0 check (sent_count >= 0),
  failed_count integer not null default 0 check (failed_count >= 0),
  delivered_count integer not null default 0 check (delivered_count >= 0),
  bounced_count integer not null default 0 check (bounced_count >= 0),
  soft_bounce_count integer not null default 0 check (soft_bounce_count >= 0),
  complained_count integer not null default 0 check (complained_count >= 0),
  unsubscribed_count integer not null default 0 check (unsubscribed_count >= 0),
  opened_count integer not null default 0 check (opened_count >= 0),
  clicked_count integer not null default 0 check (clicked_count >= 0),
  created_by uuid references auth.users(id) on delete set null,
  scheduled_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists newsletter_campaigns_brevo_campaign_unique
  on public.newsletter_campaigns (brevo_campaign_id)
  where brevo_campaign_id is not null;

create index if not exists newsletter_campaigns_created_at_idx
  on public.newsletter_campaigns (created_at desc);

create index if not exists newsletter_campaigns_status_idx
  on public.newsletter_campaigns (status, created_at desc);

create table if not exists public.newsletter_campaign_recipients (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.newsletter_campaigns(id) on delete cascade,
  subscriber_id uuid not null references public.newsletter_subscribers(id) on delete cascade,
  first_name_snapshot text not null,
  email_snapshot text not null,
  brevo_contact_id bigint,
  status text not null default 'pending'
    check (status in ('pending', 'queued', 'sent', 'delivered', 'soft_bounced', 'bounced', 'complained', 'unsubscribed', 'failed', 'skipped')),
  provider_message_id text,
  error_message text,
  sent_at timestamptz,
  delivered_at timestamptz,
  soft_bounced_at timestamptz,
  bounced_at timestamptz,
  complained_at timestamptz,
  unsubscribed_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, subscriber_id)
);

create index if not exists newsletter_campaign_recipients_status_idx
  on public.newsletter_campaign_recipients (campaign_id, status);

create index if not exists newsletter_campaign_recipients_email_idx
  on public.newsletter_campaign_recipients (lower(email_snapshot));

alter table public.newsletter_campaign_recipients
  drop constraint if exists newsletter_campaign_recipients_status_check;
alter table public.newsletter_campaign_recipients
  add constraint newsletter_campaign_recipients_status_check
  check (status in ('pending', 'queued', 'sent', 'delivered', 'soft_bounced', 'bounced', 'complained', 'unsubscribed', 'failed', 'skipped'));

alter table public.newsletter_campaigns
  add column if not exists queued_count integer not null default 0 check (queued_count >= 0),
  add column if not exists delivered_count integer not null default 0 check (delivered_count >= 0),
  add column if not exists bounced_count integer not null default 0 check (bounced_count >= 0),
  add column if not exists soft_bounce_count integer not null default 0 check (soft_bounce_count >= 0),
  add column if not exists complained_count integer not null default 0 check (complained_count >= 0),
  add column if not exists unsubscribed_count integer not null default 0 check (unsubscribed_count >= 0),
  add column if not exists opened_count integer not null default 0 check (opened_count >= 0),
  add column if not exists clicked_count integer not null default 0 check (clicked_count >= 0);

alter table public.newsletter_campaign_recipients
  add column if not exists delivered_at timestamptz,
  add column if not exists soft_bounced_at timestamptz,
  add column if not exists bounced_at timestamptz,
  add column if not exists complained_at timestamptz,
  add column if not exists unsubscribed_at timestamptz,
  add column if not exists opened_at timestamptz,
  add column if not exists clicked_at timestamptz;

create table if not exists public.newsletter_provider_events (
  event_key text primary key,
  campaign_id uuid not null references public.newsletter_campaigns(id) on delete cascade,
  recipient_id uuid not null references public.newsletter_campaign_recipients(id) on delete cascade,
  event_type text not null check (event_type in ('delivered', 'soft_bounce', 'hard_bounce', 'spam', 'unsubscribe', 'opened', 'click')),
  occurred_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_provider_events_campaign_event_idx
  on public.newsletter_provider_events (campaign_id, event_type, occurred_at desc);

alter table public.newsletter_provider_events enable row level security;
revoke all on table public.newsletter_provider_events from public, anon, authenticated;
grant all on table public.newsletter_provider_events to service_role;

create or replace function public.apply_newsletter_provider_event(
  p_event_key text,
  p_campaign_id uuid,
  p_recipient_id uuid,
  p_subscriber_id uuid,
  p_event_type text,
  p_occurred_at timestamptz
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_event_count integer;
  current_queued integer;
  total_recipients integer;
  delivered_total integer;
  bounced_total integer;
  soft_bounced_total integer;
  complained_total integer;
  unsubscribed_total integer;
  opened_total integer;
  clicked_total integer;
  failed_total integer;
begin
  if p_event_type not in ('delivered', 'soft_bounce', 'hard_bounce', 'spam', 'unsubscribe', 'opened', 'click') then
    raise exception 'Unsupported newsletter provider event.';
  end if;

  insert into public.newsletter_provider_events (
    event_key, campaign_id, recipient_id, event_type, occurred_at
  ) values (
    p_event_key, p_campaign_id, p_recipient_id, p_event_type, p_occurred_at
  ) on conflict (event_key) do nothing;

  get diagnostics inserted_event_count = row_count;
  if inserted_event_count = 0 then
    return false;
  end if;

  update public.newsletter_campaign_recipients
  set
    status = case p_event_type
      when 'delivered' then case when status in ('unsubscribed', 'bounced', 'complained', 'failed', 'skipped') then status else 'delivered' end
      when 'soft_bounce' then case when status in ('unsubscribed', 'bounced', 'complained', 'failed', 'skipped', 'delivered') then status else 'soft_bounced' end
      when 'hard_bounce' then case when status in ('unsubscribed', 'complained', 'failed', 'skipped') then status else 'bounced' end
      when 'spam' then case when status in ('unsubscribed', 'failed', 'skipped') then status else 'complained' end
      when 'unsubscribe' then 'unsubscribed'
      else status
    end,
    delivered_at = case when p_event_type = 'delivered' then coalesce(delivered_at, p_occurred_at) else delivered_at end,
    soft_bounced_at = case when p_event_type = 'soft_bounce' then coalesce(soft_bounced_at, p_occurred_at) else soft_bounced_at end,
    bounced_at = case when p_event_type = 'hard_bounce' then coalesce(bounced_at, p_occurred_at) else bounced_at end,
    complained_at = case when p_event_type = 'spam' then coalesce(complained_at, p_occurred_at) else complained_at end,
    unsubscribed_at = case when p_event_type = 'unsubscribe' then coalesce(unsubscribed_at, p_occurred_at) else unsubscribed_at end,
    opened_at = case when p_event_type = 'opened' then coalesce(opened_at, p_occurred_at) else opened_at end,
    clicked_at = case when p_event_type = 'click' then coalesce(clicked_at, p_occurred_at) else clicked_at end
  where id = p_recipient_id and campaign_id = p_campaign_id;

  if p_event_type = 'unsubscribe' then
    update public.newsletter_subscribers
    set subscription_status = 'unsubscribed', unsubscribed_at = coalesce(unsubscribed_at, p_occurred_at)
    where id = p_subscriber_id;
  elsif p_event_type = 'hard_bounce' then
    update public.newsletter_subscribers
    set subscription_status = 'bounced'
    where id = p_subscriber_id and subscription_status <> 'unsubscribed';
  elsif p_event_type = 'spam' then
    update public.newsletter_subscribers
    set subscription_status = 'complained'
    where id = p_subscriber_id and subscription_status <> 'unsubscribed';
  end if;

  select
    count(*) filter (where status in ('pending', 'queued')),
    count(*),
    count(*) filter (where delivered_at is not null),
    count(*) filter (where status = 'bounced'),
    count(*) filter (where soft_bounced_at is not null),
    count(*) filter (where status = 'complained'),
    count(*) filter (where status = 'unsubscribed'),
    count(*) filter (where opened_at is not null),
    count(*) filter (where clicked_at is not null),
    count(*) filter (where status = 'failed')
  into current_queued, total_recipients, delivered_total, bounced_total,
       soft_bounced_total, complained_total, unsubscribed_total, opened_total,
       clicked_total, failed_total
  from public.newsletter_campaign_recipients
  where campaign_id = p_campaign_id;

  update public.newsletter_campaigns
  set
    recipient_count = total_recipients,
    queued_count = current_queued,
    sent_count = delivered_total + bounced_total + complained_total + unsubscribed_total,
    failed_count = greatest(failed_count, failed_total),
    delivered_count = delivered_total,
    bounced_count = bounced_total,
    soft_bounce_count = soft_bounced_total,
    complained_count = complained_total,
    unsubscribed_count = unsubscribed_total,
    opened_count = opened_total,
    clicked_count = clicked_total,
    status = case when current_queued = 0 and status = 'sending' then 'sent' else status end,
    sent_at = case when current_queued = 0 and status = 'sending' then coalesce(sent_at, p_occurred_at) else sent_at end
  where id = p_campaign_id;

  return true;
end;
$$;

revoke all on function public.apply_newsletter_provider_event(text, uuid, uuid, uuid, text, timestamptz) from public, anon, authenticated;
grant execute on function public.apply_newsletter_provider_event(text, uuid, uuid, uuid, text, timestamptz) to service_role;

create or replace function public.set_newsletter_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_newsletter_updated_at() from public, anon, authenticated;

drop trigger if exists newsletter_campaigns_set_updated_at
  on public.newsletter_campaigns;
create trigger newsletter_campaigns_set_updated_at
  before update on public.newsletter_campaigns
  for each row execute function public.set_newsletter_updated_at();

drop trigger if exists newsletter_campaign_recipients_set_updated_at
  on public.newsletter_campaign_recipients;
create trigger newsletter_campaign_recipients_set_updated_at
  before update on public.newsletter_campaign_recipients
  for each row execute function public.set_newsletter_updated_at();

alter table public.newsletter_campaigns enable row level security;
alter table public.newsletter_campaign_recipients enable row level security;

revoke all on table public.newsletter_campaigns from public, anon, authenticated;
revoke all on table public.newsletter_campaign_recipients from public, anon, authenticated;
grant select, insert, update, delete on table public.newsletter_campaigns to authenticated;
grant select, insert, update, delete on table public.newsletter_campaign_recipients to authenticated;

drop policy if exists "Admins can manage newsletter campaigns"
  on public.newsletter_campaigns;
create policy "Admins can manage newsletter campaigns"
  on public.newsletter_campaigns
  for all
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can manage newsletter campaign recipients"
  on public.newsletter_campaign_recipients;
create policy "Admins can manage newsletter campaign recipients"
  on public.newsletter_campaign_recipients
  for all
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
