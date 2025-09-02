import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-4">
        <Link href="/" className="font-semibold">ALX Polly</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/polls">Polls</Link>
          <Link href="/polls/new">Create</Link>
          <Link href="/(auth)/sign-in">Sign in</Link>
        </nav>
      </div>
    </header>
  );
}
