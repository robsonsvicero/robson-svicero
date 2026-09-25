alter table public.projects
  add column if not exists client_name text,
  add column if not exists project_year text,
  add column if not exists project_scope text,
  add column if not exists technology text,
  add column if not exists context text,
  add column if not exists challenge text,
  add column if not exists solution text,
  add column if not exists results text;
