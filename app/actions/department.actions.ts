'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { sortById } from '@/lib/sort';
import { Department } from '@/types/departments';

const revalidateDepartments = () => {
  revalidatePath('/admin/departments');
  revalidatePath('/structure');
};

export async function getDepartmentList() {
  const res = await apiClient.get<Department[]>('/departments');
  return sortById(res.data);
}

export async function deleteDepartment(id: number) {
  await apiClient.delete(`/departments/${id}`);
  revalidateDepartments();
}

export async function getDepartmentById(id: string) {
  const res = await apiClient.get<Department>(`/departments/${id}`);
  return res.data;
}

export async function createDepartment(formData: FormData) {
  const res = await apiClient.post<Department>('/departments', formData);

  revalidateDepartments();
  return res.data;
}

export async function updateDepartment(
  id: number,
  data: {
    name: string;
    shortDescription: string;
    buttonLink: string;
    description: string;
    gains: string;
    headFirstName: string;
    headLastName: string;
    headMiddleName?: string;
  },
) {
  await apiClient.patch('/departments', {
    id,
    ...data,
  });

  revalidateDepartments();
}

export async function updateDepartmentImage(id: number, file: File) {
  const formData = new FormData();
  formData.append('image', file);

  await apiClient.patch(`/departments/image/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  revalidateDepartments();
}

export async function updateDepartmentHeadImage(id: number, file: File) {
  const formData = new FormData();
  formData.append('image', file);

  await apiClient.patch(`/departments/head-image/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  revalidateDepartments();
}

export async function createDepartmentProject(formData: FormData) {
  await apiClient.post('/departments/projects', formData);
  revalidateDepartments();
}

export async function updateProject(
  id: number,
  data: {
    name: string;
    description: string;
  },
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

  revalidateDepartments();
}

export async function deleteDepartmentProject(projectId: number) {
  await apiClient.delete(`/departments/projects/${projectId}`);
  revalidateDepartments();
}

export async function createDepartmentSection(data: {
  departmentId: number;
  name: string;
  description: string;
}) {
  await apiClient.post('/departments/sections', data);
  revalidateDepartments();
}

export async function updateDepartmentSection(
  id: number,
  data: {
    name: string;
    description: string;
  },
) {
  await apiClient.put('/departments/sections', { id, ...data });
  revalidateDepartments();
}

export async function deleteDepartmentSection(sectionId: number) {
  await apiClient.delete(`/departments/sections/${sectionId}`);
  revalidateDepartments();
}
