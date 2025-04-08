'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Department } from '@/types/departments';

export async function getDepartmentList() {
  const res = await apiClient.get<Department[]>('/departments');
  return res.data;
}

export async function deleteDepartment(id: number) {
  await apiClient.delete(`/departments/${id}`);
  revalidatePath('/admin/departments');
}

export async function getDepartmentById(id: string) {
  const res = await apiClient.get<Department>(`/departments/${id}`);
  return res.data;
}

export async function createDepartment(formData: FormData) {
  await apiClient.post('/departments', formData);

  revalidatePath('/admin/departments');
}

export async function updateDepartment(id: number, data: object) {
  await apiClient.patch('/departments', {
    id,
    ...data,
  });

  revalidatePath('/admin/departments');
}

export async function updateDepartmentImage(id: number, file: File) {
  const formData = new FormData();
  formData.append('image', file);

  await apiClient.patch(`/departments/image/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function createDepartmentProject(formData: FormData) {
  await apiClient.post('/departments/projects', formData);
}

export async function updateProject(
  id: number,
  data: object,
  file?: File | null,
) {
  await apiClient.patch('/departments/projects', { id, ...data });

  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    await apiClient.patch(`/departments/projects/image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  revalidatePath('/admin/departments');
}

export async function deleteDepartmentProject(projectId: number) {
  await apiClient.delete(`/departments/projects/${projectId}`);
  revalidatePath(`/admin/departments/${projectId}`);
}
