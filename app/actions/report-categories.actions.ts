'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { ReportCategory } from '@/types/report';

type ReportCategoryPayload = Pick<ReportCategory, 'name' | 'color'>;

export async function getReportCategories() {
  const res = await apiClient.get<ReportCategory[]>('/reports/categories');
  return res.data;
}

export async function createReportCategory(data: ReportCategoryPayload) {
  const res = await apiClient.post<ReportCategory>('/reports/categories', data);

  revalidatePath('/admin/reports');
  return res.data;
}

export async function updateReportCategory(
  id: number,
  data: ReportCategoryPayload,
) {
  await apiClient.patch<ReportCategory>('/reports/categories', {
    id,
    ...data,
  });

  revalidatePath('/admin/reports');
}

export async function deleteReportCategory(id: number, moveTo?: number) {
  await apiClient.delete(`/reports/categories/${id}`, { params: { moveTo } });

  revalidatePath('/admin/reports');
}
