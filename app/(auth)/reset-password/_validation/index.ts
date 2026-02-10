import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z.email('Некоректна пошта'),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
