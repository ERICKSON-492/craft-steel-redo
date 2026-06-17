// src/lib/auth.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseReady } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isReady: boolean;
  isAdmin: boolean;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ready = isSupabaseReady();
    setIsReady(ready);
    
    if (!ready) {
      console.error('[Auth] Supabase not configured');
      setIsLoading(false);
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('[Auth] Initial session:', session?.user?.email || 'None');
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check if user is admin
      if (session?.user) {
        await checkAdminStatus(session.user);
      }
      
      setIsLoading(false);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[Auth] State changed:', event, session?.user?.email || 'None');
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkAdminStatus(session.user);
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Function to check if user is admin
  const checkAdminStatus = async (user: User) => {
    try {
      // Check if user's email is the admin email
      const adminEmail = 'ericksonagengo6@gmail.com';
      const isAdminUser = user.email === adminEmail;
      
      setIsAdmin(isAdminUser);
      console.log('[Auth] Admin status for', user.email, ':', isAdminUser);
      
      // Optional: Also check profiles table for role
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (!error && profile) {
        const isAdminFromProfile = profile.role === 'admin';
        setIsAdmin(isAdminUser || isAdminFromProfile);
        console.log('[Auth] Profile admin status:', isAdminFromProfile);
      }
    } catch (error) {
      console.error('[Auth] Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isReady) {
      return { error: new Error('Supabase not configured') };
    }
    
    console.log('[Auth] Attempting sign in for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('[Auth] Sign in error:', error.message);
      return { error: error.message };
    }
    
    console.log('[Auth] Sign in successful:', data.user?.email);
    setUser(data.user);
    setSession(data.session);
    
    // Check admin status
    if (data.user) {
      await checkAdminStatus(data.user);
    }
    
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    if (!isReady) {
      return { error: new Error('Supabase not configured') };
    }
    
    console.log('[Auth] Attempting sign up for:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: email.split('@')[0],
          role: email === 'ericksonagengo6@gmail.com' ? 'admin' : 'staff'
        }
      }
    });
    
    if (error) {
      console.error('[Auth] Sign up error:', error.message);
      return { error: error.message };
    }
    
    console.log('[Auth] Sign up successful:', data.user?.email);
    return { error: null };
  };

  const signOut = async () => {
    console.log('[Auth] Signing out');
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
      isReady,
      isAdmin,
      loading,
      signIn, 
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
