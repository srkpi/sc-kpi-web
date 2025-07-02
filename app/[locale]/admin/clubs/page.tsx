import { getClubList } from '@/app/[locale]/actions/club.actions';
import ClubsPage from '@/app/[locale]/admin/clubs/ClubsPage';

export default async function Page() {
  const clubs = await getClubList();
  return <ClubsPage clubs={clubs} />;
}
