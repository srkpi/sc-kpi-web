'use server';

import axios from 'axios';
import https from 'https';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { refreshTokens } from '@/app/actions/auth.actions';
import { Tokens } from '@/types/auth';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
  },
  withCredentials: true,
  httpsAgent,
});

apiClient.interceptors.request.use(async config => {
  // @ts-expect-error custom property
  if (config.noAuth) return config;

  const tokens = (await cookies()).get('tokens')?.value;
  if (tokens) {
    const { accessToken } = JSON.parse(tokens) as Tokens;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const success = await refreshTokens();
      if (success) {
        // console.log("success")
        return apiClient(originalRequest);
      } else {
        (await cookies()).delete('tokens');
        redirect('/login');
      }
    }
    return Promise.reject(error);
  },
);
