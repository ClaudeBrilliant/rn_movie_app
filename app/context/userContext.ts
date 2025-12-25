import { authService } from '@/services/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';

interface UserContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined) as React.Context<UserContextType | undefined>;

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    await authService.login(email, password);
    await loadUser();
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const register = async (email: string, password: string, name: string) => {
    await authService.createAccount(email, password, name);
    await authService.login(email, password);
    await loadUser();
  };

  const refreshUser = async () => {
    await loadUser();
  };

  const value: UserContextType = { user, loading, login, logout, register, refreshUser };
  
  return React.createElement(
    UserContext.Provider,
    { value },
    children
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};