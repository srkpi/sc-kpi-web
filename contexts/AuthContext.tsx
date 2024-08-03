'use client';
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';
import { errorHandler } from '@/lib/api/api.helpers';
import { DecodedTokenType, LoginDto, RegisterDto, Role } from '@/types/auth';

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
      isAdmin: () => boolean;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [isRefreshingToken, setIsRefreshingToken] = useState<boolean>(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsRefreshingToken(true);
        const access_token = await refreshToken();
        setToken(access_token);
        setRefreshError(null);
      } catch (error) {
        setToken(null);
        setRefreshError(errorHandler(error));
      } finally {
        setIsRefreshingToken(false);
      }
    };

    if (!token && !isRefreshingToken && !refreshError) {
      initAuth();
    }
  }, [token, isRefreshingToken, refreshError]);

  useLayoutEffect(() => {
    if (refreshError) return;
    const authInterceptor = api.interceptors.request.use(config => {
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token, refreshError]);

  useLayoutEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      response => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 403 &&
          !originalRequest._retry &&
          !isRefreshingToken
        ) {
          originalRequest._retry = true;
          setIsRefreshingToken(true);
          try {
            const access_token = await refreshToken();
            setToken(access_token);
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + access_token;
            return api(originalRequest);
          } catch (refreshError) {
            setRefreshError(errorHandler(refreshError));
            return Promise.reject(refreshError);
          } finally {
            setIsRefreshingToken(false);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [isRefreshingToken]);

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

  const isAdmin = () => {
    try {
      if (!token) return false;
      const decoded = jwtDecode<DecodedTokenType>(token);
      return decoded.role.toLowerCase() === Role.ADMIN;
    } catch (error) {
      return false;
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
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
