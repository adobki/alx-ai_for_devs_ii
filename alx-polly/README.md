# ALX Polly

Scaffold for a Next.js App Router polling app with Tailwind, shadcn-style UI, and Supabase.

Setup
- npm install
- Create .env.local with Supabase vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- npm run dev

Key paths
- app/actions/polls.ts (Server Actions placeholders)
- lib/supabase/client.ts (Supabase client helper)
- app/(auth)/* (Auth placeholders)
- app/polls/* (Poll pages)
- components/ui/* (shadcn-style components)
