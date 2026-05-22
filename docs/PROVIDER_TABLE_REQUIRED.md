# Provider Table Required

Run this in Supabase SQL Editor before using Settings provider manager.

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

create policy "provider_settings_select" on public.provider_settings
for select using (auth.uid() = user_id);

create policy "provider_settings_insert" on public.provider_settings
for insert with check (auth.uid() = user_id);

create policy "provider_settings_update" on public.provider_settings
for update using (auth.uid() = user_id);

create policy "provider_settings_delete" on public.provider_settings
for delete using (auth.uid() = user_id);
```

If the table already exists, run only this:

```sql
alter table public.provider_settings add column if not exists reset_at timestamptz;
```

The app can store many provider entries. Provider limits still belong to each provider. When one entry is limited, mark it as limited, then use another ready entry. After reset time, press Check Cooldown to make it ready again.