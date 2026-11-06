import { unstable_rethrow } from 'next/navigation';

import { stripHtml } from '@/lib/html';
import { Area } from '@/types/area';
import { Manager } from '@/types/manager';
import { StructureDepartment } from '@/types/structure-department';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchList<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()) as T[];
  } catch (error) {
    unstable_rethrow(error);
    console.error(`Failed to load ${path}:`, error);
    return [];
  }
}

export const getManagers = () => fetchList<Manager>('/managers');
export const getAreas = () => fetchList<Area>('/areas');

export const getDepartments = async (): Promise<StructureDepartment[]> => {
  const departments = await fetchList<StructureDepartment>('/departments');

  return departments.map(department => ({
    ...department,
    name: stripHtml(department.name),
    sections: department.sections?.map(section => ({
      ...section,
      name: stripHtml(section.name),
    })),
    projects: department.projects?.map(project => ({
      ...project,
      name: stripHtml(project.name),
    })),
  }));
};
