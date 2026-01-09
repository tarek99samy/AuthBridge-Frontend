import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import SignupPage from '@/pages/Signup';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import NotfoundPage from './pages/Notfound';
import ResetPasswordPage from './pages/ResetPassword';
import VerifyPage from './pages/Verify';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/verify',
    element: <VerifyPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotfoundPage />,
  },
]);
