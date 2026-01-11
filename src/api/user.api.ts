import type { UpdateUserNamePayload } from '@/types/user.types';
import { api } from './axios';

export const updateName = async (email: string, data: UpdateUserNamePayload) => await api.put(`/users/email/${email}`, data);
