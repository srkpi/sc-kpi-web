import * as z from 'zod';

export const requiredText = (max: number) =>
  z
    .string()
    .trim()
    .min(1, { message: 'Поле обов’язкове' })
    .max(max, { message: `Максимум ${max} символів` });
