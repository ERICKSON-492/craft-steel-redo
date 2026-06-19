// src/lib/auth.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseReady } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  loading: boolean;
  isReady: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ FIXED: Removed the redundant filter on user_role
  const checkAdmin = async (uid: string | undefined) => {
    if (!uid) { 
      setIsAdmin(false); 
      return; 
    }
    
    try {
      // ✅ Only filter by user_id, not user_role
      const { data, error } = await supabase
        .from('user_roles')
        .select('user_role')
        .eq('user_id', uid);

      if (error) {
        console.error('Admin check error:', error);
        setIsAdmin(false);
        return;
      }

      // Check if the user exists and has admin role
      setIsAdmin(data !== null && data.length > 0 && data[0]?.user_role === 'admin');
    } catch (error) {
      console.error('Admin check failed:', error);
      setIsAdmin(false);
    }
  };

  // ✅ Alternative: Use the RPC function if you created it
  // const checkAdmin = async (uid: string | undefined) => {
  //   if (!uid) {
  //     setIsAdmin(false);
  //     return;
  //   }
  //   try {
  //     const { data, error } = await supabase
  //       .rpc('is_admin', { user_uuid: uid });
  //     if (error) throw error;
  //     setIsAdmin(data || false);
  //   } catch (error) {
  //     console.error('Admin check failed:', error);
  //     setIsAdmin(false);
  //   }
  // };

  useEffect(() => {
    const ready = isSupabaseReady();
    setIsReady(ready);
    if (!ready) { 
      setIsLoading(false); 
      return; 
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      await checkAdmin(session?.user?.id);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      // defer admin check to avoid deadlock in callback
      setTimeout(() => { checkAdmin(session?.user?.id); }, 0);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isReady) return { error: new Error('Supabase not configured') };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error };
    setUser(data.user);
    setSession(data.session);
    await checkAdmin(data.user?.id);
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    if (!isReady) return { error: new Error('Supabase not configured') };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin/login` },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      loading: isLoading, 
      isReady, 
      isAdmin, 
      signIn, 
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
