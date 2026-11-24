do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'projects'
      and column_name = 'project_scope'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'projects'
      and column_name = 'segment'
  ) then
    alter table public.projects rename column project_scope to segment;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'projects'
      and column_name = 'technology'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'projects'
      and column_name = 'created_system'
  ) then
    alter table public.projects rename column technology to created_system;
  end if;
end $$;

alter table public.projects
  add column if not exists client_name text,
  add column if not exists project_year text,
  add column if not exists segment text,
  add column if not exists created_system text,
  add column if not exists context text,
  add column if not exists challenge text,
  add column if not exists solution text,
  add column if not exists results text;

alter table public.projects
  drop column if exists full_description;
