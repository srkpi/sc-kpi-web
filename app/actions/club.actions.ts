'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Club } from '@/types/club';

export async function getClubList() {
  const res = await apiClient<Club[]>(`/clubs`);
  return res.data;
}

export async function getClubById(id: string) {
  const res = await apiClient<Club>(`/clubs/${id}`);
  return res.data;
}

export async function createClub(formData: FormData) {
  await apiClient.post('/clubs', formData);

  revalidatePath('/admin/clubs');
}

export async function updateClub(
  id: number,
  data: {
    name: string;
    description: string;
    shortDescription: string;
    buttonLink: string;
    categoriesIds: number[];
  },
) {
  await apiClient.patch(`/clubs`, {
    id: id,
    ...data,
  });

  revalidatePath('/admin/clubs');
}

export async function updateClubImage(id: number, file: File) {
  const formData = new FormData();
  formData.append('image', file);

  await apiClient.patch(`/clubs/image/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deleteClub(id: number) {
  await apiClient.delete(`/clubs/${id}`);

  revalidatePath('/admin/clubs');
}

export async function createClubProject(formData: FormData) {
  await apiClient.post('/clubs/projects', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deleteClubProject(projectId: number) {
  await apiClient.delete(`/clubs/projects/${projectId}`);
  revalidatePath(`/admin/clubs/${projectId}`);
}
