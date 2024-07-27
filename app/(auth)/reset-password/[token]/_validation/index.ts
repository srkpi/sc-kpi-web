import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Пароль має містити щонайменше 8 символів')
      .regex(/[a-z]/, 'Пароль має містити принаймні одну малу літеру')
      .regex(/[A-Z]/, 'Пароль має містити принаймні одну велику літеру')
      .regex(/[0-9]/, 'Пароль має містити принаймні одну цифру'),
    confirmPassword: z
      .string()
      .min(8, 'Пароль має містити щонайменше 8 символів'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Паролі повинні збігатися',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
