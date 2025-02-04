import { getDepartmentList } from '@/app/actions/department.actions';
import DepartmentsPage from '@/app/admin/departments/DepartmentsPage';

export default async function Page() {
  const departments = await getDepartmentList();
  return <DepartmentsPage departments={departments} />;
}
