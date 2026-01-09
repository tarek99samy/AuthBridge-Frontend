import type { LoginPayload, ResetPasswordPayload, SignupPayload, VerifyQuestionPayload, VerifyUserPayload } from '@/types/auth.types';
import { api } from './axios';

export const login = (data: LoginPayload) => api.post('/auth/login', data);

export const signup = (data: SignupPayload) => api.post('/auth/signup', data);

export const verifyUser = (data: VerifyUserPayload) => api.post('/auth/verify-user', data);

export const verifyQuestion = (data: VerifyQuestionPayload) => api.post('/auth/verify-question', data);

export const resetPassword = (data: ResetPasswordPayload) => api.post('/auth/reset-password', data);

export const getMe = () => api.get('/auth/me');

export const logout = () => api.post('/auth/logout');
