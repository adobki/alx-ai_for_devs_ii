"use client";

import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';

export function Navbar() {
  const auth = ((): ReturnType<typeof useAuth> | null => {
    try {
      return useAuth();
    } catch {
      return null;
    }
  })();
  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-4">
        <Link href="/" className="font-semibold">ALX Polly</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/polls">Polls</Link>
          <Link href="/polls/new">Create</Link>
          <Link href="/about">About</Link>
          {auth?.user ? (
            <button className="underline" type="button" onClick={() => auth.signOut()}>Sign out</button>
          ) : (
            <>
              <Link href="/sign-in">Sign in</Link>
              <Link href="/sign-up">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
