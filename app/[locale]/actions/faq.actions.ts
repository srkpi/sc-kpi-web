'use server';

import { revalidatePath } from 'next/cache';

import { FormDataType } from '@/app/[locale]/admin/faq/validation';
import { apiClient } from '@/lib/client';
import { Category } from '@/types/category';
import { FAQ } from '@/types/faq';

export async function getFAQList() {
  const res = await apiClient<FAQ[]>('/faq');
  return res.data;
}

export async function getFAQById(id: string) {
  const { data } = await apiClient.get<FAQ>(`/faq/${id}`);
  return data;
}

export async function getFAQCategoryList() {
  const res = await apiClient<Category[]>('/faq/categories');
  return res.data;
}

export async function createFAQ(data: FormDataType) {
  const payload = {
    question: data.question,
    categoryId: parseInt(data.categoryId),
    answer: data.answer,
  };
  await apiClient.post('/faq', payload);
  revalidatePath('/admin/faq');
}

export async function updateFAQ(id: number, data: FormDataType) {
  const payload = { ...data, id, categoryId: parseInt(data.categoryId) };
  await apiClient.patch('/faq', payload);
  revalidatePath('/admin/faq');
}

export async function deleteFAQ(id: number) {
  await apiClient.delete(`/faq/${id}`);

  revalidatePath('/admin/faq');
}
export async function updateFAQCategory(id: number, name: string) {
  await apiClient.put('/faq/categories', { id, name });
}

export async function deleteFAQCategory(id: number) {
  await apiClient.delete(`/faq/categories/${id}`);
}

export async function addFaqCategory(name: string) {
  const response = await apiClient.post<Category>('/faq/categories', { name });
  return response.data;
}
