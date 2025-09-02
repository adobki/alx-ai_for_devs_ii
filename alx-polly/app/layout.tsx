import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'ALX Polly',
  description: 'Polls with live voting and QR sharing',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-gray-900">
        <Navbar />
        <main className="mx-auto max-w-3xl p-4">{children}</main>
      </body>
    </html>
  );
}
