import { getFAQCategoryList } from '@/app/[locale]/actions/faq.actions';
import { CreateFaqPage } from '@/app/[locale]/admin/faq/create/CreateFaqPage';

export default async function Page() {
  const categories = await getFAQCategoryList();
  return <CreateFaqPage categories={categories} />;
}
