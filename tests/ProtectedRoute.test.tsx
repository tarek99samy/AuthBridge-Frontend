import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../src/components/ProtectedRoute';
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

describe('ProtectedRoute', () => {
  it('redirects to login if user is not authenticated', async () => {
    render(
      <AuthProvider>
        <QueryClientProvider client={mockQueryClient}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/login" element={<div>Login Page</div>} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div>Home</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });
});
