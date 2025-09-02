import pkg from '../../package.json';

export default function AboutPage() {
  const version = (pkg as { version?: string }).version ?? '0.1.0';
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">ALX Polly v{version}</h1>
      <p className="text-sm text-gray-600">ALX Polly is a polling app built with Next.js, Supabase, and Tailwind.</p>
      <p className="text-sm text-gray-600">
        Created by <a className="underline" href="https://github.com/adobki" target="_blank" rel="noreferrer">@adobki</a> using the AI Agent in Cursor.
      </p>
      <p className="text-sm text-gray-600"> Built with 💖for the ALX community.</p>
    </section>
  );
}
