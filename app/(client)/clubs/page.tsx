import ClubsPage from '@/app/(client)/clubs/ClubsPage';
import { api } from '@/lib/api';
import { Club } from '@/types/club';

export default async function Page() {
  const { data } = await api.get<Club[]>(`/clubs`);

  return <ClubsPage clubs={data} />;
}
