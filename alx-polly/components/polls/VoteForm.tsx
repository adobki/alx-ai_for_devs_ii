'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

function getOrCreateGuestToken(pollId: string): string {
  const key = `alx-polly:guest:${pollId}`;
  let token = '';
  try { token = localStorage.getItem(key) || ''; } catch {}
  if (!token) {
    token = crypto.randomUUID();
    try { localStorage.setItem(key, token); } catch {}
  }
  return token;
}

export function VoteForm({ pollId, options, userId }: { pollId: string; options: Array<{ id: string; label: string; count?: number }>; userId?: string | null }) {
  const [selected, setSelected] = useState<string>('');
  const guestToken = useMemo(() => (!userId ? getOrCreateGuestToken(pollId) : ''), [pollId, userId]);
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  useEffect(() => {
    const key = `alx-polly:voted:${pollId}`;
    try {
      const voted = localStorage.getItem(key);
      if (voted) setAlreadyVoted(true);
    } catch {}
    try {
      const sel = localStorage.getItem(`alx-polly:selected:${pollId}`);
      if (sel) setSelected(sel);
    } catch {}
  }, [pollId]);

  return (
    <form action="/" onSubmit={(e) => e.preventDefault()} className="space-y-2">
      <input type="hidden" name="pollId" value={pollId} />
      {userId ? <input type="hidden" name="userId" value={userId} /> : <input type="hidden" name="guestToken" value={guestToken} />}
      {alreadyVoted ? (
        <div className="space-y-2">
          {(() => {
            const total = options.reduce((a, b) => a + (b.count ?? 0), 0);
            return options.map((opt) => {
              const pct = total > 0 ? Math.round(((opt.count ?? 0) / total) * 100) : 0;
              const isUsers = selected === opt.id;
              return (
                <div key={`bar-${opt.id}`} className="text-sm">
                  <div className="flex items-center gap-2">
                    <span>{opt.label}</span>
                    <span className="ml-auto text-xs text-gray-600">{opt.count ?? 0} votes • {pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded bg-gray-100">
                    <div className={isUsers ? 'h-1.5 rounded border border-gray-400 bg-white' : 'h-1.5 rounded bg-gray-900'} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            });
          })()}
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="optionId"
                  value={opt.id}
                  checked={selected === opt.id}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    try { localStorage.setItem(`alx-polly:selected:${pollId}`, e.target.value); } catch {}
                  }}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
          <Button
            type="submit"
            onClick={async () => {
              if (!selected) return;
              const form = new FormData();
              form.set('pollId', pollId);
              form.set('optionId', selected);
              if (userId) form.set('userId', userId);
              else form.set('guestToken', guestToken);
              const { submitVoteAction } = await import('../../app/actions/polls');
              setAlreadyVoted(true);
              try { localStorage.setItem(`alx-polly:voted:${pollId}`, '1'); } catch {}
              await submitVoteAction(form);
            }}
          >
            Vote
          </Button>
        </>
      )}
    </form>
  );
}
