import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Введіть старий пароль'),
    newPassword: z
      .string()
      .min(8, 'Пароль має містити щонайменше 8 символів')
      .regex(/[a-z]/, 'Пароль має містити принаймні одну малу літеру')
      .regex(/[A-Z]/, 'Пароль має містити принаймні одну велику літеру')
      .regex(/[0-9]/, 'Пароль має містити принаймні одну цифру')
      .regex(
        /(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>\/?\\|`~])/,
        'Пароль має містити принаймні один спеціальний символ',
      ),
    confirmPassword: z
      .string()
      .min(8, 'Пароль має містити щонайменше 8 символів'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Паролі повинні збігатися',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
