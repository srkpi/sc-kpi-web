import { getFAQList } from '@/app/[locale]/actions/faq.actions';
import FaqPage from '@/app/[locale]/admin/faq/FaqPage';

export default async function Page() {
  const data = await getFAQList();
  return <FaqPage faqs={data} />;
}
