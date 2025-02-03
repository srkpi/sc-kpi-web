'use server';

import { revalidatePath } from 'next/cache';

import { FormData } from '@/app/admin/faq/create/CreateFaqPage';
import { client } from '@/lib/client';
import { FAQ } from '@/types/faq';

export async function getFAQList(): Promise<FAQ[]> {
  const res = await client('/faq');
  return res.json();
}

export async function createFAQ(data: FormData) {
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

export async function deleteFAQ(id: number) {
  const res = await client(`/faq/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  revalidatePath('/admin/faq');
}
