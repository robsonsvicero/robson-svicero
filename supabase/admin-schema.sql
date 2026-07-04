create extension if not exists pgcrypto;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  image text,
  author text,
  category text,
  excerpt text,
  seo_title text,
  seo_description text,
  thumbnail text,
  published_at date,
  views_count bigint not null default 0,
  reading_time text,
  intro text,
  content text,
  canonical_url text,
  sections jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts add column if not exists image text;
alter table public.blog_posts add column if not exists author text;
alter table public.blog_posts add column if not exists thumbnail text;
alter table public.blog_posts add column if not exists content text;
alter table public.blog_posts add column if not exists canonical_url text;
alter table public.blog_posts add column if not exists views_count bigint not null default 0;

create table if not exists public.blog_post_views (
  id bigserial primary key,
  post_slug text not null references public.blog_posts(slug) on delete cascade,
  visitor_key text not null,
  viewed_at timestamptz not null default now(),
  unique (post_slug, visitor_key)
);

create index if not exists blog_post_views_post_slug_idx
on public.blog_post_views (post_slug);

create or replace function public.register_blog_post_view(p_post_slug text, p_visitor_key text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  current_views bigint;
begin
  if p_post_slug is null or p_visitor_key is null then
    return null;
  end if;

  insert into public.blog_post_views (post_slug, visitor_key)
  values (p_post_slug, p_visitor_key)
  on conflict (post_slug, visitor_key) do nothing;

  if found then
    update public.blog_posts
    set views_count = coalesce(views_count, 0) + 1
    where slug = p_post_slug
    returning views_count into current_views;
  else
    select views_count
    into current_views
    from public.blog_posts
    where slug = p_post_slug;
  end if;

  return coalesce(current_views, 0);
end;
$$;

revoke all on function public.register_blog_post_view(text, text) from public;
grant execute on function public.register_blog_post_view(text, text) to anon, authenticated;

create index if not exists blog_posts_published_at_idx
on public.blog_posts (published_at desc);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  full_description text,
  meta_description text,
  seo_title text,
  seo_description text,
  thumbnail text,
  image text,
  image_2 text,
  image_3 text,
  image_4 text,
  image_5 text,
  alt text,
  external_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects add column if not exists image_2 text;
alter table public.projects add column if not exists thumbnail text;
alter table public.projects add column if not exists image_3 text;
alter table public.projects add column if not exists image_4 text;
alter table public.projects add column if not exists image_5 text;

create index if not exists projects_created_at_idx
on public.projects (created_at desc);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
alter table public.projects enable row level security;
alter table public.blog_post_views enable row level security;

drop policy if exists "Public can read site media" on storage.objects;
create policy "Public can read site media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'site-media');

drop policy if exists "Authenticated users upload site media" on storage.objects;
create policy "Authenticated users upload site media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'site-media');

drop policy if exists "Authenticated users update site media" on storage.objects;
create policy "Authenticated users update site media"
on storage.objects for update
to authenticated
using (bucket_id = 'site-media')
with check (bucket_id = 'site-media');

drop policy if exists "Authenticated users delete site media" on storage.objects;
create policy "Authenticated users delete site media"
on storage.objects for delete
to authenticated
using (bucket_id = 'site-media');

drop policy if exists "Public can read blog posts" on public.blog_posts;
create policy "Public can read blog posts"
on public.blog_posts for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users manage blog posts" on public.blog_posts;
create policy "Authenticated users manage blog posts"
on public.blog_posts for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
on public.projects for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users manage projects" on public.projects;
create policy "Authenticated users manage projects"
on public.projects for all
to authenticated
using (true)
with check (true);
