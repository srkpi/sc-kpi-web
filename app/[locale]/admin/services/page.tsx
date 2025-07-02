import { getServiceList } from '@/app/[locale]/actions/service.actions';
import ServicesPage from '@/app/[locale]/admin/services/ServicesPage';

export default async function Page() {
  const data = await getServiceList();
  return <ServicesPage services={data} />;
}
