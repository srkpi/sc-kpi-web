import FaqPage from '@/app/admin/faq/FaqPage';
import { api } from '@/lib/api';
import { FAQType } from '@/types/faq';

export default async function Page() {
  const { data } = await api.get<FAQType[]>('/faq');
  return <FaqPage faqs={data} />;
}
