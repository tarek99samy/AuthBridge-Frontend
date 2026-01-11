import type { SignupPayload } from '@/types/auth.types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const securityQuestions = [
  'What was your childhood nickname?',
  'In what city did you meet your spouse/significant other?',
  'What is the name of your favorite childhood friend?',
  'What street did you live on in third grade?',
  "What is your oldest sibling's birthday month and year?",
  'What school did you attend for sixth grade?',
  'What is the middle name of your oldest child?',
  "What is your oldest cousin's first and last name?",
  "What is your oldest sibling's first and last name?",
  "What is your maternal grandmother's maiden name?",
  "What is the name of a college you applied to but didn't attend?",
  "What is your oldest cousin's middle name?",
  "What is your oldest cousin's birthday month and year?",
  "What is your maternal grandfather's maiden name?",
  'What was the name of your first stuffed animal?',
];

export function isFormComplete(form: SignupPayload | SignupPayload['verification']): boolean {
  return Object.values(form).every((value) => {
    if (typeof value === 'object' && value !== null) {
      return isFormComplete(value);
    }
    return Boolean(value);
  });
}
