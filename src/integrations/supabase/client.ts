// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Client-side Supabase client
function createSupabaseClient() {
  // Use import.meta.env for Vite client-side
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ['SUPABASE_URL'] : []),
      ...(!SUPABASE_PUBLISHABLE_KEY ? ['SUPABASE_PUBLISHABLE_KEY'] : []),
    ];
    console.warn(`[Supabase] Missing environment variable(s): ${missing.join(', ')}. Supabase features will be disabled.`);
    return null;
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    }
  });
}

type SupabaseClient = ReturnType<typeof createClient<Database>> | null;

let _supabase: SupabaseClient | undefined;

function getSupabase(): SupabaseClient {
  if (_supabase === undefined) {
    _supabase = createSupabaseClient();
  }
  return _supabase;
}

// Helper to check if Supabase is ready
export function isSupabaseReady(): boolean {
  const client = getSupabase();
  return client !== null;
}

// Export the client
export const supabase = new Proxy({} as object, {
  get(_, prop, receiver) {
    const client = getSupabase();
    if (!client) {
      // Return friendly error for auth methods
      if (prop === 'auth') {
        return new Proxy({} as object, {
          get(_, authProp) {
            return async (...args: any[]) => {
              console.error(`[Supabase] Cannot call auth.${String(authProp)} - Supabase not configured`);
              return { 
                data: null, 
                error: new Error('Supabase not configured. Please check environment variables.') 
              };
            };
          }
        });
      }
      return undefined;
    }
    return Reflect.get(client, prop, receiver);
  },
}) as ReturnType<typeof createClient<Database>>;
