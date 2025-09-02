import { CreatePollForm } from '@/components/polls/CreatePollForm';

export default function NewPollPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Create poll</h1>
      <CreatePollForm />
    </section>
  );
}
