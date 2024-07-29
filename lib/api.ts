import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
  withCredentials: true,
});

export const campusApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CAMPUS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
