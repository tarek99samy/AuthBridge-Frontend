import { useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AlertCircleIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signup } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { isFormComplete, securityQuestions } from '@/lib/utils';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { setCsrfToken } = useAuthContext();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    verification: {
      question: '',
      answer: '',
    },
  });
  const formComplete = isFormComplete(form);

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      const { csrfToken } = response.data;
      setCsrfToken(csrfToken);
      toast.success(`Successfully signed up!`);
      setTimeout(() => navigate('/'), 500);
    },
    onError: (error) => {
      setForm({ name: '', email: '', password: '', verification: { question: '', answer: '' } });
      const errorMessage = error?.response?.data?.error?.message || (error as Error).message || 'Could not sign up with those data';
      toast.error(errorMessage);
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onQuestionChange = (value: string) => {
    setForm({ ...form, verification: { ...form.verification, question: value } });
  };

  const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, verification: { ...form.verification, answer: e.target.value } });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formComplete) {
      toast.error('Please fill out all fields');
      return;
    }
    mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-xl border p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-center">Sign Up</h1>

        <Input name="name" minLength={3} placeholder="Name (ex: John Doe)" onChange={onChange} required />
        <Input name="email" type="email" placeholder="Email (ex: 4oT9d@example.com)" onChange={onChange} required />
        <Input name="password" type="password" minLength={8} placeholder="Password" onChange={onChange} required />
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
        <Select onValueChange={onQuestionChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a security question" />
          </SelectTrigger>
          <SelectContent>
            {securityQuestions.map((question, index) => (
              <SelectItem key={index} value={question}>
                {question}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="answer"
          type="text"
          placeholder="Security question answer"
          onChange={onAnswerChange}
          disabled={!form.verification.question}
          required
        />

        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>ATTENTION PLEASE READ BELOW</AlertTitle>
          <AlertDescription>
            <ul>
              <li>* Choose a security question and provide an answer that you can easily remember but others would not easily guess.</li>
              <li>* Your security question answer is case-sensitive.</li>
              <li>* Do not share your question or answer with anyone.</li>
              <li>* You will not be able to recover your account if you forget your security question answer.</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Button type="submit" className="w-full" disabled={isPending || !formComplete}>
          {isPending ? 'Creating...' : 'Create Account'}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{' '}
          <Link to="/login">
            <Button variant="link">Login</Button>
          </Link>
        </p>
      </form>
    </div>
  );
}
