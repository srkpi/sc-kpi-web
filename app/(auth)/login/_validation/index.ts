import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Некоректна пошта'),
  password: z.string().min(8, 'Пароль має містити не менше 8 символів'),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
