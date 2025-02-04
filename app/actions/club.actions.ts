'use server';

import { revalidatePath } from 'next/cache';

import { client } from '@/lib/client';
import { Club } from '@/types/club';

export async function getClubList() {
  const res = await client<Club[]>(`/clubs`);
  return res.json();
}

export async function getClubById(id: string) {
  const res = await client<Club>(`/clubs/${id}`);
  return res.json();
}

export async function deleteClub(id: number) {
  const res = await client(`/clubs/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  revalidatePath('/admin/clubs');
}
