import ServicesPage from '@/app/admin/services/ServicesPage';
import { api } from '@/lib/api';
import { Service } from '@/types/service';

export default async function Page() {
  const { data } = await api.get<Service[]>('/services');
  return <ServicesPage services={data} />;
}
