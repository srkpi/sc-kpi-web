import { getCategoriesList } from '@/app/actions/categories.actions';
import CategoriesPage from '@/app/admin/categories/CategoriesPage';

export default async function Page() {
  const categories = await getCategoriesList();
  return <CategoriesPage categories={categories} />;
}
