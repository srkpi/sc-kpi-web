import { getManagerById } from '@/app/actions/manager.actions';
import ManagerForm from '@/app/admin/managers/ManagerForm';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const manager = await getManagerById(id);

  return <ManagerForm key={manager.id} manager={manager} />;
}
