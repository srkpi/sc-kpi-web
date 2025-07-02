import {
  getFAQById,
  getFAQCategoryList,
} from '@/app/[locale]/actions/faq.actions';
import EditFaqPage from '@/app/[locale]/admin/faq/[id]/EditFaqPage';

interface EditDepartmentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: EditDepartmentPageProps) {
  const id = (await params).id;
  const faq = await getFAQById(id);
  const categories = await getFAQCategoryList();

  return <EditFaqPage categories={categories} faq={faq} />;
}
