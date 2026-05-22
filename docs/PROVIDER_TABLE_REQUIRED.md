# Provider Table Required

Run this in Supabase SQL Editor before using Settings provider manager.

## Safe version, can be re-run

```sql
create table if not exists public.provider_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  provider text not null,
  label text,
  value_text text not null,
  preview_text text,
  status text default 'ready',
  reset_at timestamptz,
  created_at timestamptz default now()
);

alter table public.provider_settings enable row level security;

alter table public.provider_settings add column if not exists reset_at timestamptz;

DROP POLICY IF EXISTS "provider_settings_select" ON public.provider_settings;
DROP POLICY IF EXISTS "provider_settings_insert" ON public.provider_settings;
DROP POLICY IF EXISTS "provider_settings_update" ON public.provider_settings;
DROP POLICY IF EXISTS "provider_settings_delete" ON public.provider_settings;

create policy "provider_settings_select" on public.provider_settings
for select using (auth.uid() = user_id);

create policy "provider_settings_insert" on public.provider_settings
for insert with check (auth.uid() = user_id);

create policy "provider_settings_update" on public.provider_settings
for update using (auth.uid() = user_id);

create policy "provider_settings_delete" on public.provider_settings
for delete using (auth.uid() = user_id);
```

## If your error says policy already exists

That means the table and policy were created before. Use the safe version above. It removes the old policy and creates it again.

The app can store many provider entries. Provider limits still belong to each provider. When one entry is limited, mark it as limited, then use another ready entry. After reset time, press Check Cooldown to make it ready again.