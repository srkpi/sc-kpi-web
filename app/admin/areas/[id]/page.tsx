import { getAreaById } from '@/app/actions/area.actions';
import AreaForm from '@/app/admin/areas/AreaForm';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const area = await getAreaById(id);

  return <AreaForm key={area.id} area={area} />;
}
