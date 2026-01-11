import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { verifyUser, verifyQuestion, resetPassword } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'email' | 'question' | 'password'>('email');

  const verifyUserMutation = useMutation({
    mutationFn: verifyUser,
    onSuccess: (res) => {
      setQuestion(res.data);
      setStep('question');
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error?.message || (error as Error).message || 'Could not verify user';
      toast.error(errorMessage);
    },
  });

  const verifyQuestionMutation = useMutation({
    mutationFn: verifyQuestion,
    onSuccess: () => {
      toast.success('Verification successful!');
      setStep('password');
    },
    onError: () => {
      toast.error(`Incorrect answer`);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset successful! Please login.');
      setTimeout(() => navigate('/login'), 500);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error?.message || (error as Error).message || 'Could not reset password';
      toast.error(errorMessage);
    },
  });

  const handleEmailSubmit = () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    verifyUserMutation.mutate({ email });
  };

  const handleAnswerSubmit = () => {
    if (!answer) {
      toast.error('Please enter your answer');
      return;
    }
    verifyQuestionMutation.mutate({ email, answer });
  };

  const handleResetPasswordSubmit = () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please enter a valid password and confirm it.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords mismatch');
      return;
    }
    resetPasswordMutation.mutate({ email, newPassword });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (step) {
      case 'email':
        handleEmailSubmit();
        break;
      case 'question':
        handleAnswerSubmit();
        break;
      case 'password':
        handleResetPasswordSubmit();
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-xl border p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-center">Account Verification</h1>
        {step === 'email' ? (
          <>
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" className="w-full" disabled={verifyUserMutation.isPending}>
              {verifyUserMutation.isPending ? 'Verifying...' : 'Next'}
            </Button>
          </>
        ) : step === 'question' ? (
          <>
            <div className="text-center font-medium">{question}</div>
            <Input type="text" placeholder="Your answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
            <Button type="submit" className="w-full" disabled={verifyQuestionMutation.isPending}>
              {verifyQuestionMutation.isPending ? 'Verifying...' : 'Submit'}
            </Button>
          </>
        ) : (
          <>
            <Input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Alert>
              <AlertCircleIcon />
              <AlertTitle>Password Requirements</AlertTitle>
              <AlertDescription>
                <ul>
                  <li>• Minimum 8 characters</li>
                  <li>• At least one uppercase letter</li>
                  <li>• At least one lowercase letter</li>
                  <li>• At least one number</li>
                  <li>• At least one special character (e.g., !@#$%^&*)</li>
                </ul>
              </AlertDescription>
            </Alert>
            <Button type="submit" className="w-full" disabled={resetPasswordMutation.isPending || !newPassword || !confirmPassword}>
              {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset Password'}
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
