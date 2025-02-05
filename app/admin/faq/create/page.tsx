import { getFAQCategoryList } from '@/app/actions/faq.actions';
import { CreateFaqPage } from '@/app/admin/faq/create/CreateFaqPage';

export default async function Page() {
  const categories = await getFAQCategoryList();
  return <CreateFaqPage categories={categories} />;
}
