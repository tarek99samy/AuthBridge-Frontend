import type { LoginPayload, ResetPasswordPayload, SignupPayload, VerifyQuestionPayload, VerifyUserPayload } from '@/types/auth.types';
import { api } from './axios';

export const login = async (data: LoginPayload) => await api.post('/auth/login', data);

export const signup = async (data: SignupPayload) => await api.post('/auth/signup', data);

export const verifyUser = async (data: VerifyUserPayload) => await api.post('/auth/verify-user', data);

export const verifyQuestion = async (data: VerifyQuestionPayload) => await api.post('/auth/verify-question', data);

export const resetPassword = async (data: ResetPasswordPayload) => await api.post('/auth/reset-password', data);

export const getMe = async () => await api.get('/auth/me');

export const getCsrfToken = async () => await api.get('/auth/csrf-token');

export const logout = async () => await api.post('/auth/logout');
