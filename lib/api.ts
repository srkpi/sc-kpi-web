import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
  withCredentials: true,
  httpsAgent: httpsAgent,
});

export const campusApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CAMPUS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
