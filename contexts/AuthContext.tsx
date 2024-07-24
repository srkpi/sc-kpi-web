'use client';
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';
import { errorHandler } from '@/lib/api/api.helpers';
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
    const initAuth = async () => {
      try {
        const access_token = await refreshToken();
        setToken(access_token);
      } catch (error) {
        setToken(null);
      }
    };
    if (!token) {
      initAuth();
    }
  }, [token]);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(config => {
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    api.interceptors.response.use(
      response => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const access_token = await refreshToken();
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + access_token;
          return api(originalRequest);
        }
        return Promise.reject(error);
      },
    );
  });

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
