import { createPollAction } from '../../actions/polls';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewPollPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Create poll</h1>
      <form className="space-y-4" action={createPollAction}>
        <div className="space-y-1">
          <label className="text-sm font-medium">Question</label>
          <Input name="question" placeholder="What should we vote on?" />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Options (min 2)</div>
          <Input name="option1" placeholder="Option 1" />
          <Input name="option2" placeholder="Option 2" />
          <Input name="option3" placeholder="Option 3 (optional)" />
          <Input name="option4" placeholder="Option 4 (optional)" />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </section>
  );
}
