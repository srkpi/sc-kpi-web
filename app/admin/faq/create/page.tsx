import { CreateFaqPage } from '@/app/admin/faq/create/CreateFaqPage';
import { api } from '@/lib/api';
import { Category } from '@/types/category';

export default async function Page() {
  const { data } = await api.get<Category[]>('/faq/categories');
  return <CreateFaqPage categories={data} />;
}
