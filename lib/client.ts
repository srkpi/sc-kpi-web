'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(async config => {
  const jwt = (await cookies()).get('token')?.value;
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

// apiClient.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       cookies().delete('token');
//       redirect('/');
//     }
//     return Promise.reject(error);
//   },
// );
