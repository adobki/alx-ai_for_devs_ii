'use server';

// Placeholder server actions. Wire to Supabase in a follow-up.

export async function createPollAction(formData: FormData) {
  const question = String(formData.get('question') || '').trim();
  const rawOptions = (formData.getAll('options') as string[]) || [];
  const options = rawOptions.map((o) => String(o).trim()).filter(Boolean);
  if (!question || options.length < 2) {
    throw new Error('Question and at least two options are required');
  }
  const { createSupabaseServerClient } = await import('@/lib/supabase/server');
  const supabase = createSupabaseServerClient();
  const { data: poll, error: pollError } = await supabase
    .from('polls')
    .insert({ question })
    .select('id')
    .single();
  if (pollError || !poll?.id) {
    throw new Error(pollError?.message || 'Failed to create poll');
  }
  const optionRows = options.map((label) => ({ poll_id: poll.id, label }));
  const { error: optError } = await supabase.from('poll_options').insert(optionRows);
  if (optError) {
    throw new Error(optError.message || 'Failed to create poll options');
  }
  const { redirect } = await import('next/navigation');
  redirect(`/polls/${poll.id}`);
}

export async function submitVoteAction(formData: FormData) {
  const pollId = String(formData.get('pollId') || '');
  const optionId = String(formData.get('optionId') || '');
  const userId = String(formData.get('userId') || '');
  const guestToken = String(formData.get('guestToken') || '');
  if (!pollId || !optionId) {
    throw new Error('Missing pollId or optionId');
  }
  const { createSupabaseServerClient } = await import('@/lib/supabase/server');
  const supabase = createSupabaseServerClient();
  // Prevent multiple votes: check existing by userId or guestToken when provided
  if (userId) {
    const { data: existingByUser, error: checkErr } = await supabase
      .from('votes')
      .select('id')
      .eq('poll_id', pollId)
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle();
    if (checkErr) {
      throw new Error(checkErr.message || 'Failed to validate existing vote');
    }
    if (existingByUser) {
      const { redirect } = await import('next/navigation');
      redirect(`/polls/${pollId}`);
    }
  }
  if (!userId && guestToken) {
    const { data: existingByGuest, error: checkErr } = await supabase
      .from('votes')
      .select('id')
      .eq('poll_id', pollId)
      .eq('guest_token', guestToken)
      .limit(1)
      .maybeSingle();
    if (checkErr) {
      throw new Error(checkErr.message || 'Failed to validate existing vote');
    }
    if (existingByGuest) {
      const { redirect } = await import('next/navigation');
      redirect(`/polls/${pollId}`);
    }
  }
  const { error } = await supabase.from('votes').insert({ poll_id: pollId, option_id: optionId, user_id: userId || null, guest_token: userId ? null : (guestToken || null) });
  if (error) {
    throw new Error(error.message || 'Failed to submit vote');
  }
  const { revalidatePath } = await import('next/cache');
  const { redirect } = await import('next/navigation');
  revalidatePath(`/polls/${pollId}`);
  redirect(`/polls/${pollId}`);
}
