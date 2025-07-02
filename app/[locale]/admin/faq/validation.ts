import * as z from 'zod';

export const FormSchema = z.object({
  question: z.string().trim().min(1, { message: 'Обов’язкове поле' }),
  categoryId: z.string().trim().min(1, { message: 'Обов’язкове поле' }),
  answer: z.string().trim().min(1, { message: 'Обов’язкове поле' }),
});

export type FormDataType = z.infer<typeof FormSchema>;
