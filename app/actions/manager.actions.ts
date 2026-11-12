'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { sortManagers } from '@/lib/sort';
import { Manager } from '@/types/manager';

const revalidateManagers = () => {
  revalidatePath('/admin/managers');
  revalidatePath('/structure');
};

export async function getManagerList() {
  const res = await apiClient.get<Manager[]>('/managers');
  return sortManagers(res.data);
}

export async function getManagerById(id: string) {
  const res = await apiClient.get<Manager>(`/managers/${id}`);
  return res.data;
}

// formData: файл у полі `image`, дані JSON-рядком у полі `json`
export async function createManager(formData: FormData) {
  await apiClient.post('/managers', formData);
  revalidateManagers();
}

export async function updateManager(
  id: number,
  data: {
    firstName: string;
    lastName: string;
    middleName?: string;
    position: string;
    duties: string;
  },
  file?: File | null,
) {
  await apiClient.put('/managers', { id, ...data });

  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    await apiClient.put(`/managers/image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  revalidateManagers();
}

export async function deleteManager(id: number) {
  await apiClient.delete(`/managers/${id}`);
  revalidateManagers();
}
