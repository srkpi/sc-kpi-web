'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Project } from '@/types/project';

export async function getProjectList() {
  const res = await apiClient<Project[]>(`/projects`);
  return res.data;
}

export async function getProjectById(id: string) {
  const res = await apiClient<Project>(`/projects/${id}`);
  return res.data;
}

export async function createProject(formData: FormData) {
  await apiClient.post('/projects', formData);

  revalidatePath('/admin/projects');
}

export async function updateProject(
  id: number,
  data: {
    name: string;
    description: string;
    shortDescription: string;
    skillsIds: number[];
  },
) {
  await apiClient.patch(`/projects`, {
    id: id,
    ...data,
  });

  revalidatePath('/admin/projects');
}

export async function updateProjectImage(id: number, file: File) {
  const formData = new FormData();
  formData.append('image', file);

  await apiClient.patch(`/projects/image/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deleteProject(id: number) {
  await apiClient.delete(`/projects/${id}`);

  revalidatePath('/admin/projects');
}
