
import { ZodError, ZodIssue } from 'zod';

export const formatZodErrors = (error: ZodError): Record<string, string[]> => {
  const formattedErrors: Record<string, string[]> = {};

  error.issues.forEach((issue: ZodIssue) => {
    const field = issue.path[0] as string;
    if (!formattedErrors[field]) {
      formattedErrors[field] = [];
    }
    formattedErrors[field].push(issue.message);
  });

  return formattedErrors;
};
