import { getAccessToken, setAccessToken } from '@/services/auth/auth.helper';
import { LoginDto } from '@/types/auth';
import { RegisterDto } from '@/types/auth/';

import { api } from '../api';

import { errorHandler } from './api.helpers';

export const signIn = async (credentials: LoginDto) => {
  const response = await api.post('/auth/local/sign-in', credentials);
  setAccessToken(response.data.accessToken);
  return response.data;
};

export const signUp = async (
  data: RegisterDto,
): Promise<{ accessToken: string } | null> => {
  const response = await api.post('/auth/local/sign-up', data);
  setAccessToken(response.data.accessToken);
  return response.data;
};

export const signOut = async () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return;
  }
  setAccessToken(null);
  await api.post('/auth/logout');
};

export const refreshToken = async (): Promise<string | null> => {
  const response = await api.post('/auth/refresh');
  setAccessToken(response.data.accessToken);
  return response.data.accessToken;
};

export const recoveryPassword = async (
  email: string,
): Promise<{ error: string | null; success: boolean }> => {
  try {
    const response = await api.post('/auth/recovery', { email });
    if (response.status === 204) {
      return { success: true, error: null };
    }
    return { success: false, error: 'Expected status code 204' };
  } catch (error) {
    return { error: errorHandler(error), success: false };
  }
};

export const resetPassword = async (credentials: {
  newPassword: string;
  token: string;
}): Promise<{ error: string | null; success: boolean }> => {
  try {
    const response = await api.put('/auth/reset-password', credentials);
    if (response.status === 204) {
      return { success: true, error: null };
    }
    return { success: false, error: 'Expected status code 204' };
  } catch (error) {
    return { error: errorHandler(error), success: false };
  }
};
