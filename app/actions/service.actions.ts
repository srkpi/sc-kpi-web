import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Service } from '@/types/service';

export async function getServiceList() {
  const res = await apiClient.get<Service[]>('/services');
  return res.data;
}

export async function createService(data: any) {
  // await clientFileUpload('/services', data);
  const res = await apiClient.post('/services', data);

  console.log(res);

  // revalidatePath('/admin/services');
  // const newService = await res.json();
  // await clientFileUpload(`/services/image/${newService.id}`, data);
}

export async function getServiceById(id: string) {
  const res = await apiClient.get<Service>(`/services/${id}`);
  return res.data;
}

export async function deleteService(id: number) {
  await apiClient.delete(`/services/${id}`);
  revalidatePath('/admin/services');
}
