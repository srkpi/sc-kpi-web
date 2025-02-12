'use server';

import { apiClient } from '@/lib/client';
import { Department } from '@/types/departments';

export async function getDepartmentList() {
  const res = await apiClient.get<Department[]>('/departments');
  return res.data;
}

export async function deleteDepartment(id: number) {
  const res = await apiClient.delete(`/departments/${id}`);
  console.log('res', res);
  // revalidatePath('/admin/departments');
}

export async function getDepartmentById(id: string) {
  const res = await apiClient.get<Department>(`/departments/${id}`);
  return res.data;
}
