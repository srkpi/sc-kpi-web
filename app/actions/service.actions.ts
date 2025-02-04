import { Service } from '@/types/service';
import { client } from '@/lib/client';

export async function getServiceList() {
  const res=  await client<Service[]>('/services');
  return res.json();
}
export async function getServiceById(id: string) {
  const res = await client<Service>(`/services/${id}`);
  return res.json();
}