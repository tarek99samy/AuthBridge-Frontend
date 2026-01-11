import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../src/pages/Login';
import { AuthProvider } from '../src/store/auth.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

describe('LoginPage', () => {
  it('renders email and password inputs', () => {
    render(
      <AuthProvider>
        <QueryClientProvider client={mockQueryClient}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>,
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles user input', () => {
    render(
      <AuthProvider>
        <QueryClientProvider client={mockQueryClient}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>,
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});
