import axios from 'axios';

import { getAccessToken } from '@/services/auth/auth.helper';

import { refreshToken } from './api/api.auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const accessToken = getAccessToken();
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export { api };
