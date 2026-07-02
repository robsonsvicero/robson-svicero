create extension if not exists pgcrypto;

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
  published_at date,
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
alter table public.blog_posts add column if not exists content text;
alter table public.blog_posts add column if not exists canonical_url text;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  full_description text,
  meta_description text,
  seo_title text,
  seo_description text,
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
alter table public.projects add column if not exists image_3 text;
alter table public.projects add column if not exists image_4 text;
alter table public.projects add column if not exists image_5 text;

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
