'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

type Option = { id: string; label: string };

export function PollCard({
  pollId,
  question,
  options,
  votes,
  optionDisplayThreshold = 4,
}: {
  pollId: string;
  question: string;
  options: Option[];
  votes: Array<{ option_id: string }>;
  optionDisplayThreshold?: number;
}) {
  const [selected, setSelected] = useState('');
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    votes.forEach((v) => map.set(v.option_id, (map.get(v.option_id) ?? 0) + 1));
    return map;
  }, [votes]);
  const totalVotes = Array.from(counts.values()).reduce((a, b) => a + b, 0);

  useEffect(() => {
    try {
      const voted = localStorage.getItem(`alx-polly:voted:${pollId}`);
      if (voted) setAlreadyVoted(true);
      const sel = localStorage.getItem(`alx-polly:selected:${pollId}`);
      if (sel) setSelected(sel);
    } catch {}
  }, [pollId]);

  const truncated = options.length > optionDisplayThreshold;
  const visibleOptions = truncated ? options.slice(0, Math.max(1, optionDisplayThreshold - 2)) : options;

  return (
    <li className="rounded-md border p-3">
      <a href={`/polls/${pollId}`} className="font-medium hover:underline">
        {question}
      </a>
      {!alreadyVoted ? (
        <form
          className="mt-2 space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!selected) return;
            const guestKey = `alx-polly:guest:${pollId}`;
            let guestToken = '';
            try {
              guestToken = localStorage.getItem(guestKey) || '';
              if (!guestToken) {
                guestToken = crypto.randomUUID();
                localStorage.setItem(guestKey, guestToken);
              }
            } catch {}
            const form = new FormData();
            form.set('pollId', pollId);
            form.set('optionId', selected);
            if (guestToken) form.set('guestToken', guestToken);
            const { submitVoteAction } = await import('../../app/actions/polls');
            setAlreadyVoted(true);
            try { localStorage.setItem(`alx-polly:voted:${pollId}`, '1'); } catch {}
            try { localStorage.setItem(`alx-polly:selected:${pollId}`, selected); } catch {}
            await submitVoteAction(form);
          }}
        >
          {options.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2">
              <input
                type="radio"
                name={`opt-${pollId}`}
                value={opt.id}
                checked={selected === opt.id}
                onChange={(e) => setSelected(e.target.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
          <Button type="submit" disabled={!selected}>Vote</Button>
        </form>
      ) : (
        <div className="mt-2 space-y-2">
          {visibleOptions.map((opt) => {
            const count = counts.get(opt.id) ?? 0;
            const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            return (
              <div key={opt.id} className="text-sm">
                <div className="flex items-center gap-2">
                  <span>{opt.label}</span>
                  <span className="ml-auto text-xs text-gray-600">{count} votes • {pct}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded bg-gray-100">
                  <div
                    className={selected === opt.id ? 'h-1.5 rounded border border-gray-400 bg-white' : 'h-1.5 rounded bg-gray-900'}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
          {truncated ? (
            <div className="text-xs text-gray-600">+{options.length - visibleOptions.length} more options • <a href={`/polls/${pollId}`} className="underline">View details</a></div>
          ) : null}
        </div>
      )}
    </li>
  );
}
