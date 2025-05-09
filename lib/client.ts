'use server';

import axios from 'axios';
import https from 'https';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    if (error.response?.status === 401) {
      (await cookies()).delete('token');
      redirect('/login');
    }
    return Promise.reject(error);
  },
);
