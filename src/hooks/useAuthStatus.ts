import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/api/auth.api';

export function useAuthStatus() {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  });

  return {
    user: query.data?.data,
    isAuthenticated: !!query.data,
    isLoading: query.isLoading,
  };
}
