import { useEffect, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from './ui/spinner';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { getCsrfToken } from '@/api/auth.api';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuthStatus();
  const { setCsrfToken } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      getCsrfToken()
        .then((response) => {
          const { csrfToken } = response.data;
          setCsrfToken(csrfToken);
        })
        .catch((error) => {
          console.error('Error fetching CSRF token:', error);
        });
    }
  }, []);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-5">
        <h1 className="text-3xl font-bold">Checking your authentication...</h1>
        <Spinner className="size-10" />
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
