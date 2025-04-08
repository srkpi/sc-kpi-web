'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Service } from '@/types/service';

export async function getServiceList() {
  const res = await apiClient.get<Service[]>('/services');
  return res.data;
}

export async function createService(data: FormData) {
  await apiClient.post('/services', data);

  revalidatePath('/admin/services');
}

export async function getServiceById(id: string) {
  const res = await apiClient.get<Service>(`/services/${id}`);
  return res.data;
}

export async function updateService(
  id: number,
  data: {
    name: string;
    description: string;
    buttonLink: string;
  },
) {
  await apiClient.patch('/services', {
    id,
    ...data,
  });
}

export async function updateServiceImage(id: number, file: File) {
  const formData = new FormData();
  formData.append('image', file);

  await apiClient.patch(`/services/image/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deleteService(id: number) {
  await apiClient.delete(`/services/${id}`);
  revalidatePath('/admin/services');
}
