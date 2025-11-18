// lib/supabase/client.ts
// Client-side Supabase client for use in React components

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '../database.types';

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

// Singleton instance for client-side usage
let client: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (!client) {
    client = createClient();
  }
  return client;
};
