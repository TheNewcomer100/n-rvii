
import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  email?: string;
  user_metadata?: any;
}

interface Session {
  user: User;
}

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock user for demo purposes
    const mockUser: User = {
      id: 'demo-user-123',
      email: 'demo@example.com',
      user_metadata: { full_name: 'Demo User' }
    };
    
    setUser(mockUser);
    setSession({ user: mockUser });
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, metadata = {}) => {
    // Mock implementation for demo
    console.log('Sign up with:', email);
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Mock implementation for demo
    console.log('Sign in with:', email);
    return { error: null };
  };

  const signOut = async () => {
    // Mock implementation for demo
    setUser(null);
    setSession(null);
  };

  const signInWithGoogle = async () => {
    // Mock implementation for demo
    console.log('Sign in with Google');
    return { error: null };
  };

  const signInWithApple = async () => {
    // Mock implementation for demo
    console.log('Sign in with Apple');
    return { error: null };
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
