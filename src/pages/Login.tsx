import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setCsrfToken } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { csrfToken } = response.data;
      setCsrfToken(csrfToken);
      toast.success(`Successfully logged in, welcome back!`);
      setTimeout(() => navigate('/'), 500);
    },
    onError: (error) => {
      setEmail('');
      setPassword('');
      const errorMessage = error?.response?.data?.error?.message || (error as Error).message || 'Could not log in with those credentials';
      toast.error(`Could not log in with those credentials: ${errorMessage}`);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill out all fields');
      return;
    }
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-xl border p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-center">Login</h1>

        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" minLength={8} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <Button type="submit" className="w-full" disabled={isPending || !email || !password}>
          {isPending ? 'Logging in...' : 'Login'}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Don't have an account?{' '}
          <Link to="/signup">
            <Button variant="link">Sign up</Button>
          </Link>
        </p>

        <p className="text-sm text-muted-foreground text-center">
          <Link to="/reset-password">
            <Button variant="link">Forgot password?</Button>
          </Link>
        </p>

        {error && <p className="text-sm text-red-500 text-center">Invalid credentials</p>}
      </form>
    </div>
  );
}
