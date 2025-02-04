'use server';

import { revalidatePath } from 'next/cache';

import { FormDataType } from '@/app/admin/faq/validation';
import { client } from '@/lib/client';
import { Category } from '@/types/category';
import { FAQ } from '@/types/faq';

export async function getFAQList() {
  const res = await client<FAQ[]>('/faq');
  return res.json();
}

export async function getFAQCategoryList() {
  const res = await client<Category[]>('/faq/categories');
  return res.json();
}

export async function createFAQ(data: FormDataType) {
  const payload = {
    question: data.question,
    categoryId: parseInt(data.categoryId),
    answer: data.answer,
  };
  const res = await client('/faq', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  revalidatePath('/admin/faq');
}

export async function updateFAQ(id: number, data: FormDataType) {
  const payload = { ...data, id };
  console.log(JSON.stringify(payload));
  const res = await client('/faq', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  console.log(res);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
}

export async function deleteFAQ(id: number) {
  const res = await client(`/faq/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  revalidatePath('/admin/faq');
}
