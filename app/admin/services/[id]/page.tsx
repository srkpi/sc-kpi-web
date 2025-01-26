import EditServicePage from '@/app/admin/services/[id]/EditServicePage';
import { api } from '@/lib/api';
import { Service } from '@/types/service';

interface EditServicePageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: EditServicePageProps) {
  const { data } = await api.get<Service>(`/services/${params.id}`);
  return <EditServicePage service={data} />;
}
