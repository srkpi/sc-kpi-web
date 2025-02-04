import EditServicePage from '@/app/admin/services/[id]/EditServicePage';
import { getServiceById } from '@/app/actions/service.actions';

interface EditServicePageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: EditServicePageProps) {
  const data = await getServiceById(params.id);
  return <EditServicePage service={data} />;
}
