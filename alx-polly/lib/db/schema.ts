export const schemaSql = `
create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  label text not null
);

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  option_id uuid not null references public.poll_options(id) on delete cascade,
  user_id uuid null,
  guest_token text null,
  created_at timestamp with time zone default now()
);
`;

type EnsureSchemaResult = { ok: true } | { ok: false; needsSetup: true; reason: string } | { ok: false; needsSetup: false; reason: string };

export async function ensureSchema(): Promise<EnsureSchemaResult> {
  try {
    const { createSupabaseServerClient } = await import('@/lib/supabase/server');
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('polls').select('id').limit(1);
    if (error) {
      const msg = String(error.message || 'Unknown error');
      const needsSetup = msg.includes("Could not find the table") || msg.includes('schema cache');
      return { ok: false, needsSetup, reason: msg };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, needsSetup: false, reason: e instanceof Error ? e.message : 'Unknown error' };
  }
}
