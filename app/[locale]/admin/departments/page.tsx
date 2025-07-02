import { getDepartmentList } from '@/app/[locale]/actions/department.actions';
import DepartmentsPage from '@/app/[locale]/admin/departments/DepartmentsPage';

export default async function Page() {
  const departments = await getDepartmentList();
  return <DepartmentsPage departments={departments} />;
}
