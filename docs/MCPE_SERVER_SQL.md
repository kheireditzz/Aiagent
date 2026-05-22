# MCPE Server SQL

Run this in Supabase SQL Editor.

```sql
create table if not exists public.mcpe_servers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  host text not null,
  port integer default 19132,
  status text default 'saved',
  created_at timestamptz default now()
);

alter table public.mcpe_servers enable row level security;

DROP POLICY IF EXISTS "mcpe_servers_select" ON public.mcpe_servers;
DROP POLICY IF EXISTS "mcpe_servers_insert" ON public.mcpe_servers;
DROP POLICY IF EXISTS "mcpe_servers_update" ON public.mcpe_servers;
DROP POLICY IF EXISTS "mcpe_servers_delete" ON public.mcpe_servers;

create policy "mcpe_servers_select" on public.mcpe_servers
for select using (auth.uid() = user_id);

create policy "mcpe_servers_insert" on public.mcpe_servers
for insert with check (auth.uid() = user_id);

create policy "mcpe_servers_update" on public.mcpe_servers
for update using (auth.uid() = user_id);

create policy "mcpe_servers_delete" on public.mcpe_servers
for delete using (auth.uid() = user_id);
```

After running SQL, redeploy the app and open /mcpe.