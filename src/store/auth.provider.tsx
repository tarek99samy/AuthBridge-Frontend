import type { ReactNode } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { AuthContext } from './auth.context';
import { setCsrfTokenRef } from './auth-ref';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    setCsrfTokenRef(csrfToken);
  }, [csrfToken]);

  const clearAuth = useCallback(() => setCsrfToken(null), []);

  return <AuthContext.Provider value={{ csrfToken, setCsrfToken, clearAuth }}>{children}</AuthContext.Provider>;
};
