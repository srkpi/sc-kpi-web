import * as z from 'zod';

import { stripHtml } from '@/lib/html';

export const requiredText = (max: number) =>
  z
    .string()
    .trim()
    .min(1, { message: 'Поле обов’язкове' })
    .max(max, { message: `Максимум ${max} символів` });

export const requiredHtml = (max: number, requiredMessage: string) =>
  z
    .string()
    .refine(value => stripHtml(value).length > 0, { message: requiredMessage })
    .refine(value => stripHtml(value).length <= max, {
      message: `Максимум ${max} символів`,
    });

export const optionalHtml = (max: number) =>
  z.string().refine(value => stripHtml(value).length <= max, {
    message: `Максимум ${max} символів`,
  });
