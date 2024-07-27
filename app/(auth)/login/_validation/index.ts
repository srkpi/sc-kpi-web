import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Некоректна пошта'),
  password: z.string().min(8, 'Пароль має містити щонайменше 8 символів'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
