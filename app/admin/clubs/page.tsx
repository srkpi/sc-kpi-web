import { getClubList } from '@/app/actions/club.actions';
import ClubsPage from '@/app/admin/clubs/ClubsPage';

export default async function Page() {
  const clubs = await getClubList();
  return <ClubsPage clubs={clubs} />;
}
