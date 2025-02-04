import ServicesPage from '@/app/admin/services/ServicesPage';
import { getServiceList } from '@/app/actions/service.actions';

export default async function Page() {
  const data = await getServiceList()
  return <ServicesPage services={data} />;
}
