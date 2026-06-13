-- Amt Musterhausen · Supabase Schema

create table if not exists scores (
  id uuid primary key default gen_random_uuid(),
  nickname text,
  score integer not null check (score >= 0 and score <= 500),
  cause_of_death text not null,
  duration_seconds integer not null,
  client_ip text,
  created_at timestamptz not null default now()
);

-- RLS: only read via select, all writes go through edge function
alter table scores enable row level security;

create policy "Allow public read" on scores
  for select using (true);

-- No direct insert from client (use edge function)
create policy "Deny direct insert" on scores
  for insert with check (false);

-- Index for today's leaderboard
create index if not exists idx_scores_created_score on scores (created_at desc, score desc);
create index if not exists idx_scores_score on scores (score desc);
