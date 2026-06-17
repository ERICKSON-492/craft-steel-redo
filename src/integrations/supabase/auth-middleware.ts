// src/integrations/supabase/auth-middleware.ts
import { createMiddleware } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Server-side only middleware
export const requireSupabaseAuth = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    console.log('[Middleware] Checking authentication...');
    
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
      const missing = [
        ...(!SUPABASE_URL ? ['SUPABASE_URL'] : []),
        ...(!SUPABASE_PUBLISHABLE_KEY ? ['SUPABASE_PUBLISHABLE_KEY'] : []),
      ];
      const message = `Missing Supabase environment variable(s): ${missing.join(', ')}. Connect Supabase in Lovable Cloud.`;
      console.error(`[Supabase] ${message}`);
      throw new Error(message);
    }
    
    const request = getRequest();

    // For server-side rendering, check cookies for session
    const cookie = request?.headers?.get('cookie') || '';
    const supabase = createClient<Database>(
      SUPABASE_URL!,
      SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          storage: undefined,
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    // Try to get session from cookies
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.log('[Middleware] No valid session found');
      // For API routes, throw error; for page routes, let client-side handle it
      if (request?.url?.includes('/api/')) {
        throw new Error('Unauthorized: No valid session');
      }
      // For page routes, proceed without auth context
      return next({
        context: {
          supabase,
          userId: null,
          claims: null,
          isAuthenticated: false,
        },
      });
    }

    console.log('[Middleware] User authenticated:', session.user.email);
    
    return next({
      context: {
        supabase,
        userId: session.user.id,
        claims: session.user,
        isAuthenticated: true,
      },
    });
  },
);

// Client-side auth guard for routes
export function useRequireAuth() {
  // This will be used in client components
}
