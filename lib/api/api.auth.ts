import { RegisterDto } from '@/types/auth/';

import { api } from '../api';

import { errorHandler } from './api.helpers';
export const signUp = async (
  data: RegisterDto,
): Promise<{ accessToken: string } | null> => {
  const response = await api.post('/auth/local/sign-up', data);
  return response.data;
};
export const refreshToken = async (): Promise<string | null> => {
  const response = await api.post('/auth/refresh');
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
