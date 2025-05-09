'use server';

import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { apiClient } from '@/lib/client';
import { DecodedTokenType, RegisterDto, Role } from '@/types/auth';
import { User } from '@/types/auth/user';

export async function signUp(data: RegisterDto) {
  const { data: res } = await apiClient.post<{ accessToken: string }>(
    '/auth/local/sign-up',
    data,
  );
  return res.accessToken;
}

export async function login(
  email: string,
  password: string,
  rememberMe = false,
) {
  const payload = {
    email,
    password,
  };
  try {
    const response = await apiClient.post<{ accessToken: string }>(
      '/auth/local/sign-in',
      payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    if (response.status < 200 || response.status >= 300) {
      return null;
    }

    const jsonResponse = response.data;

    if (!jsonResponse) {
      return null;
    }

    await apiClient.get('/user', {
      headers: {
        Authorization: `Bearer ${jsonResponse.accessToken}`,
      },
    });

    const { accessToken } = jsonResponse;

    const tokenExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 365 days from now

    const expires = rememberMe ? tokenExpiresAt : undefined;

    (await cookies()).set('token', accessToken, {
      httpOnly: true,
      expires,
    });

    redirect('/profile/personal-data');
  } catch (error) {
    return null;
  }
}

export async function logout() {
  (await cookies()).delete('token');
  redirect('/');
}

export async function deleteUser() {
  await apiClient.delete('/auth/user');

  redirect('/');
}

export async function checkIsAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return false;
  }
  const decoded = jwtDecode<DecodedTokenType>(token);
  return decoded.role.toLowerCase() === Role.ADMIN;
}

export async function getUserInfo(): Promise<User | null> {
  try {
    const res = await apiClient<User>('/user');
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function recoveryPassword(email: string) {
  await apiClient.post('/auth/recovery', { email });
}

export async function resetPassword(credentials: {
  newPassword: string;
  token: string;
}) {
  await apiClient.put('/auth/reset-password', credentials);
}

export async function changePassword(dto: {
  oldPassword: string;
  newPassword: string;
}): Promise<{ error: string | null; success: boolean }> {
  try {
    await apiClient.put('/auth/password', dto);
    return { success: true, error: null };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        return { success: false, error: 'Неправильний старий пароль' };
      }
      if (error.response?.data.message === 'New password should be different') {
        return {
          success: false,
          error: 'Новий пароль повинен відрізнятися від старого',
        };
      }
    }
    return { success: false, error: 'Помилка зміни паролю' };
  }
}

export async function refresh(): Promise<string | null> {
  try {
    const response = await apiClient.post<{ accessToken: string }>(
      '/auth/refresh',
      null,
      {
        withCredentials: true,
      },
    );

    const { accessToken } = response.data;

    if (!accessToken) {
      return null;
    }

    (await cookies()).set('token', accessToken, {
      httpOnly: true,
    });

    return accessToken;
  } catch (error) {
    console.error('Не вдалося оновити accessToken:', error);
    return null;
  }
}
