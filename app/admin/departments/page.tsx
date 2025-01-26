import DepartmentsPage from '@/app/admin/departments/DepartmentsPage';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

export default async function Page() {
  const { data } = await api.get<Department[]>('/departments');
  return <DepartmentsPage departments={data} />;
}
