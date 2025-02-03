'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import qs from 'query-string';

import { client } from '@/lib/client';
import { DecodedTokenType, RegisterDto, Role } from '@/types/auth';
import { User } from '@/types/auth/user';

export async function signUp(
  data: RegisterDto,
): Promise<{ accessToken: string } | null> {
  const response = await client('/auth/local/sign-up', {
    method: 'POST',
    body: qs.stringify(data),
  });
  const { accessToken } = await response.json();
  return accessToken;
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
    const response = await client('/auth/local/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(payload),
    });

    if (response.status < 200 || response.status >= 300) {
      return null;
    }

    const jsonResponse = await response.json();

    if (!jsonResponse) {
      return null;
    }

    const userResponse = await client('/user', {
      headers: {
        Authorization: `Bearer ${jsonResponse.accessToken}`,
      },
    });

    if (!userResponse.ok) {
      return null;
    }

    const { accessToken } = jsonResponse;

    const tokenExpiresAt = new Date(360 * 1000);

    const expires = rememberMe ? tokenExpiresAt : undefined;

    cookies().set('token', accessToken, {
      httpOnly: true,
      expires,
    });

    redirect('/profile/personal-data');
  } catch (error) {
    return null;
  }
}

export async function logout() {
  cookies().delete('token');
  redirect('/');
}

export async function deleteUser() {
  const res = await client('/auth/user', {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  redirect('/');
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return false;
  }
  const decoded = jwtDecode<DecodedTokenType>(token);
  return decoded.role.toLowerCase() === Role.ADMIN;
}

export async function getUserInfo(): Promise<User | null> {
  const userResponse = await client<User>('/user');

  if (!userResponse.ok) {
    return null;
  }

  return userResponse.json();
}
