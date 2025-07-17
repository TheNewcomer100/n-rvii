
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithApple: () => Promise<{ error: any }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Create user profile if new user
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(() => {
            createUserProfile(session.user);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const createUserProfile = async (user: User) => {
    try {
      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          full_name: user.user_metadata?.full_name || '',
          avatar_url: user.user_metadata?.avatar_url || '',
        });

      // Create user preferences
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          notification_settings: { daily_reminders: true, energy_check_ins: true },
          privacy_settings: { anonymous_community: true, data_sharing: false },
          display_preferences: { theme: 'light', animations: true },
          subscription_tier: 'free'
        });

      // Create onboarding progress
      const { error: onboardingError } = await supabase
        .from('onboarding_progress')
        .upsert({
          user_id: user.id,
          current_step: 1,
          completed_steps: [],
          preferences: {}
        });

      // Create initial streak record with encouraging start
      const { error: streakError } = await supabase
        .from('streaks')
        .upsert({
          user_id: user.id,
          current_streak: 1, // Start with 1 to encourage users
          longest_streak: 1,
          last_check_in: new Date().toISOString().split('T')[0],
          sick_days: []
        });

      // Create a welcome goal to help new users get started
      const { error: goalError } = await supabase
        .from('goals')
        .upsert({
          user_id: user.id,
          goal_text: 'Get started with my wellness journey',
          title: 'Welcome to Nrvii',
          date: new Date().toISOString().split('T')[0],
          priority: 2, // medium priority as integer
          category: 'personal',
          completed: false,
          progress_percentage: 20, // Give encouraging starting progress
          specific: 'Explore the Nrvii platform and set up my first goals',
          measurable: 'Complete onboarding and create my first personal goal',
          achievable: 'This is a simple and achievable first step',
          relevant: 'Starting my wellness journey is important for my growth',
          time_bound: 'Complete within the first week'
        });

      if (profileError) console.error('Profile creation error:', profileError);
      if (preferencesError) console.error('Preferences creation error:', preferencesError);
      if (onboardingError) console.error('Onboarding creation error:', onboardingError);
      if (streakError) console.error('Streak creation error:', streakError);
      if (goalError) console.error('Goal creation error:', goalError);
    } catch (error) {
      console.error('Error creating user data:', error);
    }
  };

  const signUp = async (email: string, password: string, metadata = {}) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  };

  const signInWithApple = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithApple,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
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
