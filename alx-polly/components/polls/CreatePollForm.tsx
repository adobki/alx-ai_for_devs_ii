'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPollAction } from '../../app/actions/polls';

export function CreatePollForm() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const addOption = () => setOptions((prev) => [...prev, '']);
  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const trimmedOptions = options.map((o) => o.trim()).filter(Boolean);
    if (!question.trim() || trimmedOptions.length < 2) {
      setError('Provide a question and at least two options.');
      return;
    }
    setIsSubmitting(true);
    try {
      formData.set('question', question);
      // Clear any preexisting options in the formData (precaution)
      // Append current options
      trimmedOptions.forEach((opt) => formData.append('options', opt));
      await createPollAction(formData);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to create poll');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Question</label>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What should we vote on?"
        />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Options</div>
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
            />
            {options.length > 2 && (
              <Button type="button" variant="outline" onClick={() => removeOption(i)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addOption}>
          Add option
        </Button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating…' : 'Create'}
      </Button>
    </form>
  );
}
