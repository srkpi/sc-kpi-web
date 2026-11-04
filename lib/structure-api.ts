import { Area } from '@/types/area';
import { Manager } from '@/types/manager';
import { StructureDepartment } from '@/types/structure-department';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchList<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: 0 }, // на час розробки; потім можна 300
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()) as T[];
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    return [];
  }
}

export const getManagers = () => fetchList<Manager>('/managers');
export const getAreas = () => fetchList<Area>('/areas');
export const getDepartments = () =>
  fetchList<StructureDepartment>('/departments');
