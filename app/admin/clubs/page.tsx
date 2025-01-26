import ClubsPage from '@/app/admin/clubs/ClubsPage';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

export default async function Page() {
  const { data } = await api.get<Department[]>('/clubs');
  return <ClubsPage clubs={data} />;
}
