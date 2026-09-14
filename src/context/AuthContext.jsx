import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, ApiError } from '@/api/client';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@/config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const persist = (token, userData) => {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    if (userData) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  };

  const refreshMe = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const data = await api.get('auth/me', { auth: true });
      setUser(data);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const login = async (email, password) => {
    const data = await api.post('auth/login', { email, password }); // auth/login
    persist(data.token, data.user);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post('auth/logout', {}, { auth: true });
    } catch (e) {
      /* ignore */
    }
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  const updateLocalUser = (partial) => {
    setUser((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    refreshMe,
    updateLocalUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { ApiError };
