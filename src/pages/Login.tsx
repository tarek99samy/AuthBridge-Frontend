import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // later: redirect to dashboard
      console.log('Logged in');
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-xl border p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-center">Login</h1>

        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <Button type="submit" className="w-full" disabled={isPending}>
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
