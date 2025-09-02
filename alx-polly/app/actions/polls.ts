'use server';

// Placeholder server actions. Wire to Supabase in a follow-up.

export async function createPollAction(formData: FormData) {
  const question = String(formData.get('question') || '').trim();
  const rawOptions = (formData.getAll('options') as string[]) || [];
  const options = rawOptions.map((o) => String(o).trim()).filter(Boolean);
  if (!question || options.length < 2) {
    throw new Error('Question and at least two options are required');
  }
  // TODO: Insert into Supabase and return new id
  return { id: 'placeholder-id' };
}

export async function submitVoteAction(formData: FormData) {
  const pollId = String(formData.get('pollId') || '');
  const optionId = String(formData.get('optionId') || '');
  if (!pollId || !optionId) {
    throw new Error('Missing pollId or optionId');
  }
  // TODO: Insert vote into Supabase
  return { ok: true };
}
