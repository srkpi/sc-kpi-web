import { getFAQList } from '@/app/actions/faq.actions';
import FaqPage from '@/app/admin/faq/FaqPage';

export default async function Page() {
  const data = await getFAQList();
  return <FaqPage faqs={data} />;
}
