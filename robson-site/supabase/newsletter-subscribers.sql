create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(btrim(first_name)) between 2 and 100),
  email text not null check (
    email = lower(btrim(email))
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
  ),
  consent boolean not null check (consent is true),
  consent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create unique index if not exists newsletter_subscribers_email_unique
  on public.newsletter_subscribers (lower(email));

alter table public.newsletter_subscribers enable row level security;

revoke all on table public.newsletter_subscribers from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant insert (first_name, email, consent)
  on table public.newsletter_subscribers to anon;
grant select, insert, update, delete
  on table public.newsletter_subscribers to authenticated;

drop policy if exists "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers;
drop policy if exists "Admins can manage newsletter subscribers"
  on public.newsletter_subscribers;

create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (
    consent is true
    and char_length(btrim(first_name)) between 2 and 100
    and email = lower(btrim(email))
  );

create policy "Admins can manage newsletter subscribers"
  on public.newsletter_subscribers
  for all
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
