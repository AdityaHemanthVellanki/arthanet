import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from './database.types';

export function createServerSupabaseClient() {
  // Using the new approach recommended by Supabase for Next.js App Router
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value;
        },
        set(name, value, options) {
          // This is a server component, so we can't set cookies directly
          // This is a no-op but required by the interface
        },
        remove(name, options) {
          // This is a server component, so we can't remove cookies directly
          // This is a no-op but required by the interface
        }
      }
    }
  );
}
