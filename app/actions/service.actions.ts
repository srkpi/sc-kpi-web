'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Service } from '@/types/service';

export async function getServiceList() {
  const res = await apiClient.get<Service[]>('/services');
  return res.data;
}

export async function createService(data: any) {
  // await clientFileUpload('/services', data);
  await apiClient.post('/services', data);

  // revalidatePath('/admin/services');
  // const newService = await res.json();
  // await clientFileUpload(`/services/image/${newService.id}`, data);
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
  formData: FormData,
) {
  try {
    await apiClient.patch('/services', {
      id,
      ...data,
    });

    await apiClient.patch(`/services/image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteService(id: number) {
  await apiClient.delete(`/services/${id}`);
  revalidatePath('/admin/services');
}
