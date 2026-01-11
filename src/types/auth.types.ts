export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  verification: {
    question: string;
    answer: string;
  };
};

export type VerifyUserPayload = {
  email: string;
};

export type VerifyQuestionPayload = {
  email: string;
  answer: string;
};

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};

export interface AuthContextType {
  csrfToken: string | null;
  setCsrfToken: (token: string | null) => void;
  clearAuth: () => void;
}
