import { createClient } from '@supabase/supabase-js';
import { type Database } from './database.types';

// Create a simple Supabase client for server components
export function createServerSupabaseClient() {
  // Using direct client creation for server-side operations
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

