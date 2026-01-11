import { AuthContext } from '@/store/auth.context';
import { useContext } from 'react';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
