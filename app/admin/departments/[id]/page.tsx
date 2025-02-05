import EditDepartmentPage from '@/app/admin/departments/[id]/EditDepartmentPage';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const response = await api.get<Department>(`/departments/${id}`);

  return <EditDepartmentPage department={response.data} />;
}
