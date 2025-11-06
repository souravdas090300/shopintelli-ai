import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  name?: string;
  token: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('auth:user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const login = async (email: string, _password?: string) => {
    setLoading(true); setError(null);
    try {
      // Placeholder API call – replace with real endpoint when implemented
      // const { data } = await authAPI.login(email, password);
      await new Promise(r => setTimeout(r, 600));
      const fake: User = { id: 1, email, token: 'dev-token', name: email.split('@')[0] };
      setUser(fake);
      localStorage.setItem('auth:user', JSON.stringify(fake));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally { setLoading(false); }
  };

  const signup = async (name: string, email: string, _password?: string) => {
    setLoading(true); setError(null);
    try {
      // Placeholder API call – replace with real endpoint when implemented
      await new Promise(r => setTimeout(r, 800));
      const fake: User = { id: Date.now(), email, token: 'dev-token', name };
      setUser(fake);
      localStorage.setItem('auth:user', JSON.stringify(fake));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      throw err;
    } finally { setLoading(false); }
  };

  const logout = () => {
    localStorage.removeItem('auth:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
