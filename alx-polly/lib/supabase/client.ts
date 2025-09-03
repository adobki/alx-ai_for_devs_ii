import { createClient } from '@supabase/supabase-js';

export type SupabaseClientType = ReturnType<typeof createSupabaseBrowserClient>;

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !anonKey) {
    throw new Error('Supabase env vars not set');
  }
  return createClient(url, anonKey);
}
