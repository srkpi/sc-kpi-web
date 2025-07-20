'use server';

import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import ms from 'ms';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { apiClient } from '@/lib/client';
import { DecodedTokenType, RegisterDto, Role, Tokens } from '@/types/auth';
import { User } from '@/types/auth/user';

export async function signUp(data: RegisterDto): Promise<boolean> {
  try {
    const response = await apiClient.post<Tokens>('/auth/local/sign-up', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status < 200 || response.status >= 300) return false;

    const tokens = response.data;
    if (!tokens) return false;

    await apiClient.get('/user', {
      // @ts-expect-error custom property
      noAuth: true,
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    await saveTokens(tokens, undefined);
    return true;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      throw new Error('Користувач з такою поштою вже існує.');
    } else if (error instanceof AxiosError && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Сталася помилка. Спробуйте ще раз.');
    }
  }
}

export async function login(
  email: string,
  password: string,
  rememberMe = false,
): Promise<boolean> {
  const payload = {
    email,
    password,
  };
  const response = await apiClient.post<Tokens>(
    '/auth/local/sign-in',
    payload,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  if (response.status < 200 || response.status >= 300) return false;

  const tokens = response.data;
  if (!tokens) return false;

  await apiClient.get('/user', {
    // @ts-expect-error custom property
    noAuth: true,
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  const expirationTime = rememberMe ? ms('365d') : undefined;
  await saveTokens(tokens, expirationTime);

  return true;
}

export async function refreshTokens() {
  const cookieStore = await cookies();

  const tokens = cookieStore.get('tokens')?.value;
  if (!tokens) redirect('/login');

  try {
    const { refreshToken, deviceId } = JSON.parse(tokens) as Tokens;
    const response = await apiClient.post('/auth/refresh', null, {
      // @ts-expect-error custom property
      noAuth: true,
      headers: {
        Cookie: `refreshToken=${refreshToken}; deviceId=${deviceId}`,
      },
    });

    const newTokens = response.data as Tokens;
    if (!newTokens) return false;

    await apiClient.get('/user', {
      // @ts-expect-error custom property
      noAuth: true,
      headers: {
        Authorization: `Bearer ${newTokens.accessToken}`,
      },
    });

    await saveTokens(newTokens, undefined);
    return true;
  } catch (error) {
    return false;
  }
}

async function saveTokens(tokens: Tokens, expirationTime: number | undefined) {
  const expires = expirationTime
    ? new Date(Date.now() + expirationTime)
    : undefined;
  (await cookies()).set('tokens', JSON.stringify(tokens), {
    httpOnly: true,
    expires,
  });
}

export async function logout() {
  (await cookies()).delete('tokens');
}

export async function deleteUser() {
  await apiClient.delete('/auth/user');
  (await cookies()).delete('tokens');
}

export async function checkIsAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const tokens = cookieStore.get('tokens')?.value;
  if (!tokens) return false;

  const { accessToken } = JSON.parse(tokens);
  const decoded = jwtDecode<DecodedTokenType>(accessToken);
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
