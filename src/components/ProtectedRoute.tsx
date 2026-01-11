import { useEffect, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from './ui/spinner';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { getCsrfToken } from '@/api/auth.api';
import { useAuthContext } from '@/hooks/useAuthContext';
import { setCsrfTokenRef } from '@/store/auth-ref';
import { toast } from 'sonner';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuthStatus();
  const { setCsrfToken } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      getCsrfToken()
        .then((response) => {
          const { csrfToken } = response.data;
          setCsrfToken(csrfToken);
          setCsrfTokenRef(csrfToken);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.error?.message || (error as Error).message || 'please try again in a minute';
          toast.error(`Could not fetch CSRF token: ${errorMessage}`);
        });
    }
  }, [isAuthenticated, setCsrfToken]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-5">
        <h1 className="text-3xl font-bold">Checking your authentication...</h1>
        <Spinner className="size-10" />
      </div>
    );

  if (!isAuthenticated) {
    toast.error(`Could not fetch CSRF token`);
    return <Navigate to="/login" replace />;
  }

  return children;
}
