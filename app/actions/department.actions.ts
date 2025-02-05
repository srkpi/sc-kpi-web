import { apiClient } from '@/lib/client';
import { Department } from '@/types/departments';

export async function getDepartmentList() {
  const res = await apiClient.get<Department[]>('/departments');
  return res.data;
}

export async function getDepartmentById(id: string) {
  const res = await apiClient.get<Department>(`/departments/${id}`);
  return res.data;
}
