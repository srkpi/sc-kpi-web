'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Category } from '@/types/category';

export async function getCategoriesList() {
  const response = await apiClient.get<Category[]>('/clubs/category');
  return response.data;
}

export async function createCategory(category: string) {
  await apiClient.post<Category>('/clubs/category', {
    name: category,
  });

  revalidatePath('/admin/categories');
}

export async function updateCategory(categoryId: number, newName: string) {
  await apiClient.patch<Category>(`/clubs/category`, {
    id: categoryId,
    name: newName,
  });

  revalidatePath('/admin/categories');
}

export async function deleteCategory(categoryId: number) {
  await apiClient.delete(`/clubs/category/${categoryId}`);

  revalidatePath('/admin/categories');
}
