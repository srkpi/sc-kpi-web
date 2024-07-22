'use client';
import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { errorHandler } from '@/lib/api/api.helpers';
import { getAccessToken, setAccessToken } from '@/services/auth/auth.helper';
import { LoginDto, RegisterDto } from '@/types/auth';

import { refreshToken, signIn, signOut, signUp } from '../lib/api/api.auth';

type ReponseAuthType = {
  error: string | null;
  success: boolean;
};

const AuthContext = createContext<
  | {
      user: { token: string | null } | null;
      login: (cred: LoginDto) => Promise<ReponseAuthType>;
      register: (cred: RegisterDto) => Promise<ReponseAuthType>;
      logout: () => Promise<ReponseAuthType>;
      loggedIn: boolean;
      refresh: () => Promise<ReponseAuthType>;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    setToken(getAccessToken());
    const initAuth = async () => {
      try {
        const access_token = await refreshToken();
        setToken(access_token);
      } catch (error) {
        setToken(null);
        setAccessToken(null);
      }
    };
    if (!token) {
      initAuth();
    }
  }, [token]);

  const login = async (credentials: LoginDto) => {
    try {
      const data = await signIn(credentials);
      setToken(data.accessToken);
      return { success: true, error: null };
    } catch (error) {
      return { error: errorHandler(error), success: false };
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      router.push('/login');
      await signOut();
      return { success: true, error: null };
    } catch (error) {
      return { error: errorHandler(error), success: false };
    }
  };

  const register = async (
    credentials: RegisterDto,
  ): Promise<{
    success: boolean;
    error: string | null;
  }> => {
    try {
      const data = await signUp(credentials);
      setToken(data && data.accessToken);
      return { success: true, error: null };
    } catch (error) {
      return { error: errorHandler(error), success: false };
    }
  };

  const refresh = async () => {
    try {
      const access_token = await refreshToken();
      setToken(access_token);
      return { success: true, error: null };
    } catch (error) {
      return { error: errorHandler(error), success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: { token: token },
        login,
        logout,
        register,
        loggedIn: !!token,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
