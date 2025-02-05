import { getServiceList } from '@/app/actions/service.actions';
import ServicesPage from '@/app/admin/services/ServicesPage';

export default async function Page() {
  const data = await getServiceList();
  return <ServicesPage services={data} />;
}
