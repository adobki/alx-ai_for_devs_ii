export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { VoteForm } from '@/components/polls/VoteForm';
import { cookies } from 'next/headers';

export default async function PollDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { createSupabaseServerClient } = await import('@/lib/supabase/server');
  const { ensureSchema } = await import('@/lib/db/schema');
  const check = await ensureSchema();
  if (!('ok' in check && check.ok)) {
    const { SetupNotice } = await import('@/components/db/SetupNotice');
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">Poll</h1>
        <SetupNotice reason={'reason' in check ? check.reason : undefined} />
      </section>
    );
  }
  const supabase = createSupabaseServerClient();
  const { data: poll, error } = await supabase
    .from('polls')
    .select('id, question, options:poll_options(id, label), votes:votes(id, option_id)')
    .eq('id', id)
    .single();
  if (error || !poll) {
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">Poll not found</h1>
      </section>
    );
  }

  const voteCounts = new Map<string, number>();
  (poll.votes ?? []).forEach((v: { option_id: string }) => {
    voteCounts.set(v.option_id, (voteCounts.get(v.option_id) ?? 0) + 1);
  });

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">{poll.question}</h1>
      <VoteForm
        pollId={poll.id}
        options={(poll.options ?? []).map((opt: { id: string; label: string }) => ({
          ...opt,
          count: voteCounts.get(opt.id) ?? 0,
        }))}
        userId={null}
      />
    </section>
  );
}
