export function SetupNotice({ reason }: { reason?: string }) {
  return (
    <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
      <div className="font-medium">Database not initialized</div>
      <p className="mt-1">Run the following SQL in your Supabase project to create required tables:</p>
      <pre className="mt-2 overflow-auto rounded bg-white p-2 text-xs">
{`create table if not exists public.polls (
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
  created_at timestamp with time zone default now()
);`}
      </pre>
      {reason ? <p className="mt-2">Reason: {reason}</p> : null}
    </div>
  );
}
