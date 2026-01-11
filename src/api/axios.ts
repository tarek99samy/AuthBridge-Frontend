import { getCsrfTokenRef } from '@/store/auth-ref';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const csrfToken = getCsrfTokenRef();

  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  config.withCredentials = true;
  return config;
});
