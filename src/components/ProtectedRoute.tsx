import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from './ui/spinner';
import type { JSX } from 'react';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();

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
