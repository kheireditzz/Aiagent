create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  prompt text,
  result text,
  provider text,
  image_url text,
  status text default 'draft',
  created_at timestamptz default now()
);

create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  file_url text not null,
  note text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.workflows enable row level security;
alter table public.uploads enable row level security;

create policy "profiles owner read" on public.profiles for select using (auth.uid() = id);
create policy "profiles owner update" on public.profiles for update using (auth.uid() = id);
create policy "workflows owner all" on public.workflows for all using (auth.uid() = user_id);
create policy "uploads owner all" on public.uploads for all using (auth.uid() = user_id);
