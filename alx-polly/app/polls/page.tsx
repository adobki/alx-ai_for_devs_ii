type SamplePoll = { id: string; question: string; options: { label: string; votes: number }[] };

function generateSamplePolls(): SamplePoll[] {
  const examples: Array<Omit<SamplePoll, 'id'>> = [
    { question: 'Best JS framework in 2025?', options: [{ label: 'Next.js', votes: 0 }, { label: 'SvelteKit', votes: 0 }, { label: 'Nuxt', votes: 0 }] },
    { question: 'Favorite database?', options: [{ label: 'Postgres', votes: 0 }, { label: 'SQLite', votes: 0 }, { label: 'MySQL', votes: 0 }] },
    { question: 'Tabs or spaces?', options: [{ label: 'Tabs', votes: 0 }, { label: 'Spaces', votes: 0 }] },
  ];
  return examples.map((p, i) => ({
    id: String(i + 1),
    question: p.question,
    options: p.options.map((o) => ({ ...o, votes: Math.floor(Math.random() * 200) }))
  }));
}

export default async function PollsIndexPage() {
  const polls = generateSamplePolls();
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Your polls</h1>
      <ul className="space-y-3">
        {polls.map((p) => (
          <li key={p.id} className="rounded-md border p-3">
            <a href={`/polls/${p.id}`} className="font-medium hover:underline">
              {p.question}
            </a>
            <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-gray-600 sm:grid-cols-2">
              {p.options.map((o, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{o.label}</span>
                  <span>{o.votes} votes</span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
