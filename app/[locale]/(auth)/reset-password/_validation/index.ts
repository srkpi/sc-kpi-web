import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z.string().email('Некоректна пошта'),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
