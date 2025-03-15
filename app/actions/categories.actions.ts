'use server';

import { revalidatePath } from 'next/cache';

import CLUB_CATEGORIES from '@/constants/club-categories';
import { apiClient } from '@/lib/client';

export async function getCategoriesList() {
  // const res = await apiClient.get<string[]>('/categories');
  // return res.data;

  return CLUB_CATEGORIES;
}

export async function createCategory(category: string) {
  // await apiClient.post('/categories', { category });

  CLUB_CATEGORIES.push(category);

  revalidatePath('/admin/categories');
}

export async function updateCategory(category: string, newCategory: string) {
  // await apiClient.put(`/categories/${category}`, { category: newCategory });

  const categoryIndex = CLUB_CATEGORIES.indexOf(category);
  CLUB_CATEGORIES[categoryIndex] = newCategory;

  revalidatePath('/admin/categories');
}

export async function deleteCategory(category: string) {
  // await apiClient.delete(`/categories/${category}`);

  const categoryIndex = CLUB_CATEGORIES.indexOf(category);
  CLUB_CATEGORIES.splice(categoryIndex, 1);

  revalidatePath('/admin/categories');
}
