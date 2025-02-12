import { getDepartmentById } from '@/app/actions/department.actions';
import EditDepartmentPage from '@/app/admin/departments/[id]/EditDepartmentPage';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const id = (await params).id;

  const department = await getDepartmentById(id);

  return <EditDepartmentPage department={department} />;
}
