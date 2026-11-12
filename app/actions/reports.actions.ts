'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Report } from '@/types/report';

export async function getReportList() {
  const res = await apiClient<Report[]>('/reports');
  return res.data;
}

export async function createReport(formData: FormData) {
  await apiClient.post<Report>('/reports', formData);

  revalidatePath('/admin/reports');
}

export async function updateReport(formData: FormData) {
  await apiClient.patch<Report>('/reports', formData);

  revalidatePath('/admin/reports');
}

export async function deleteReport(id: number) {
  await apiClient.delete(`/reports/${id}`);

  revalidatePath('/admin/reports');
}
