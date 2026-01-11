let csrfTokenRef: string | null = null;

export const setCsrfTokenRef = (token: string | null) => {
  csrfTokenRef = token;
};

export const getCsrfTokenRef = () => csrfTokenRef;
