import { getCsrfTokenRef } from '@/store/auth-ref';
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const csrfToken = getCsrfTokenRef();

  if (csrfToken) {
    config.headers['x-csrf-token'] = csrfToken;
  }

  config.withCredentials = true;
  return config;
});
