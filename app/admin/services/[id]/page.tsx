import { getServiceById } from '@/app/actions/service.actions';
import EditServicePage from '@/app/admin/services/[id]/EditServicePage';

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: EditServicePageProps) {
  const id = (await params).id;
  const data = await getServiceById(id);
  return <EditServicePage service={data} />;
}
