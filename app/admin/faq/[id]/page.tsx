import EditFaqPage from '@/app/admin/faq/[id]/EditFaqPage';
import { api } from '@/lib/api';
import { Category } from '@/types/category';
import { FAQ } from '@/types/faq';

interface EditDepartmentPageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: EditDepartmentPageProps) {
  const { data: categories } = await api.get<Category[]>('/faq/categories');
  const { data: faq } = await api.get<FAQ>(`/faq/${params.id}`);

  return <EditFaqPage categories={categories} faq={faq} />;
}
