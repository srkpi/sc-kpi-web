'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Status } from '@/types/status';

export async function getStatusesList() {
  const response = await apiClient.get<Status[]>('/project/status');
  return response.data;
}

export async function createStatus(status: string) {
  await apiClient.post<Status>('/project/status', {
    name: status,
  });

  revalidatePath('/admin/statuses');
}

export async function updateStatus(statusId: number, newName: string) {
  await apiClient.patch<Status>(`/project/status`, {
    id: statusId,
    name: newName,
  });

  revalidatePath('/admin/statuses');
}

export async function deleteStatus(statusId: number) {
  await apiClient.delete(`/project/status/${statusId}`);

  revalidatePath('/admin/statuses');
}
