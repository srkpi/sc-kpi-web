'use server';

import axios, { AxiosRequestConfig } from 'axios';
import https from 'https';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { logout, refresh } from '@/app/actions/auth.actions';

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
  const jwt = (await cookies()).get('token')?.value;
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refresh();

        if (newAccessToken) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return apiClient(originalRequest);
        } else {
          await logout();
          redirect('/login');
        }
      } catch (refreshError) {
        await logout();
        redirect('/login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
