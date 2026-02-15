import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, SERVER_URL } from '../lib/supabase';

export type UserRole = 'reader' | 'author' | 'admin' | 'sub-admin' | 'pending-author';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status?: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAdmin: boolean;
  isAuthor: boolean;
  isSubAdmin: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Load user session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setAccessToken(session.access_token);
        
        // Fetch user profile from server
        const response = await fetch(`${SERVER_URL}/session`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.session) {
        setAccessToken(data.session.access_token);
        setUser(data.user);
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    // This is kept for backward compatibility, but the enhanced register page
    // will call the API directly
    try {
      const response = await fetch(`${SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, role: 'reader' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Auto-login after registration for readers
      await login(email, password);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await fetch(`${SERVER_URL}/signout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
      }
      
      await supabase.auth.signOut();
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    // In production, this would update the server
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    isAdmin: user?.role === 'admin',
    isAuthor: user?.role === 'author' || user?.role === 'admin',
    isSubAdmin: user?.role === 'sub-admin',
    accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};