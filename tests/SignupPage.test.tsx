import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SignupPage from '../src/pages/Signup';
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

describe('SignupPage', () => {
  it('renders signup form fields', () => {
    render(
      <AuthProvider>
        <QueryClientProvider client={mockQueryClient}>
          <BrowserRouter>
            <SignupPage />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>,
    );

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });
});
