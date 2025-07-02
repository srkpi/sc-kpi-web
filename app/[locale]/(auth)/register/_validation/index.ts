import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('Некоректна пошта'),
    middleName: z
      .string()
      .max(20, 'По батькові має містити не більше 20 символів')
      .optional(),
    firstName: z
      .string()
      .min(2, "Ім'я має містити щонайменше 2 символи")
      .max(20, "Ім'я має містити не більше 20 символів"),
    lastName: z
      .string()
      .min(2, 'Прізвище має містити щонайменше 2 символи')
      .max(20, 'Прізвище має містити не більше 20 символів'),
    password: z
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
    faculty: z.string().min(1, 'Виберіть факультет'),
    group: z.string().min(1, 'Виберіть групу'),
    terms: z.boolean().refine(value => value, {
      message: 'Погодьтесь з умовами користування',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Паролі повинні збігатися',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
