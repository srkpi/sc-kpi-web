'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { sortById } from '@/lib/sort';
import { Area } from '@/types/area';

const revalidateAreas = () => {
  revalidatePath('/admin/areas');
  revalidatePath('/structure');
};

export async function getAreaList() {
  const res = await apiClient.get<Area[]>('/areas');
  return sortById(res.data);
}

export async function getAreaById(id: string) {
  const res = await apiClient.get<Area>(`/areas/${id}`);
  return res.data;
}

// formData: файл у полі `image`, дані JSON-рядком у полі `json`
export async function createArea(formData: FormData) {
  await apiClient.post('/areas', formData);
  revalidateAreas();
}

export async function updateArea(
  id: number,
  data: {
    name: string;
    headFirstName: string;
    headLastName: string;
    description: string;
  },
  file?: File | null,
) {
  await apiClient.put('/areas', { id, ...data });

  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    await apiClient.put(`/areas/image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  revalidateAreas();
}

export async function deleteArea(id: number) {
  await apiClient.delete(`/areas/${id}`);
  revalidateAreas();
}
