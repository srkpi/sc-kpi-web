import FaqPage from '@/app/admin/faq/FaqPage';
import { api } from '@/lib/api';
import { FAQ } from '@/types/faq';

export default async function Page() {
  const { data } = await api.get<FAQ[]>('/faq');
  return <FaqPage faqs={data} />;
}
