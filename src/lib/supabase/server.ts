import { createClient } from '@supabase/supabase-js';
import { type Database } from './database.types';

// Create a single supabase client for the entire server component tree
export function createServerSupabaseClient() {
  // Using direct client creation which doesn't rely on cookies
  // This is appropriate for server-only operations
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

