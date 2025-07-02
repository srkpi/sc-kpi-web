import { getCategoriesList } from '@/app/[locale]/actions/categories.actions';
import CategoriesPage from '@/app/[locale]/admin/categories/CategoriesPage';

export default async function Page() {
  const categories = await getCategoriesList();
  return <CategoriesPage categories={categories} />;
}
