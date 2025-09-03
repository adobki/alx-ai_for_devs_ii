export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { PollCard } from '@/components/polls/PollCard';

export default async function PollsIndexPage() {
  const { createSupabaseServerClient } = await import('@/lib/supabase/server');
  const { ensureSchema } = await import('@/lib/db/schema');
  const check = await ensureSchema();
  if (!('ok' in check && check.ok)) {
    const { SetupNotice } = await import('@/components/db/SetupNotice');
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">Your polls</h1>
        <SetupNotice reason={'reason' in check ? check.reason : undefined} />
      </section>
    );
  }
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('polls')
    .select('id, question, created_at, options:poll_options(id,label), votes:votes(id,option_id)')
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message || 'Failed to load polls');
  }
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Your polls</h1>
      <ul className="grid gap-4 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((p: any) => (
          <PollCard key={p.id} pollId={p.id} question={p.question} options={p.options ?? []} votes={p.votes ?? []} />
        ))}
      </ul>
    </section>
  );
}
