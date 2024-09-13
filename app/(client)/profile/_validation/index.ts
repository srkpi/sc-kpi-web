import { z } from 'zod';

export const changeDataSchema = z.object({
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
  faculty: z.string().min(1, 'Виберіть факультет'),
  group: z.string().min(1, 'Виберіть групу'),
});

export type ChangeProfileFormData = z.infer<typeof changeDataSchema>;
