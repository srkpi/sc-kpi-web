import axios from 'axios';

export const campusApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CAMPUS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
