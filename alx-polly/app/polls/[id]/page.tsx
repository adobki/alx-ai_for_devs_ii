export default async function PollDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Poll #{id}</h1>
      <p className="text-sm text-gray-600">Poll details, options, and live votes will appear here.</p>
    </section>
  );
}
