import EditDepartmentPage from '@/app/admin/departments/[id]/EditDepartmentPage';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const response = await api.get<Department>(`/departments/${params.id}`);

  return <EditDepartmentPage department={response.data} />;
}
