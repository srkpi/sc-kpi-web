import { FC } from 'react';

import { getClubById } from '@/app/[locale]/actions/club.actions';
import EditClubPage from '@/app/[locale]/admin/clubs/[id]/EditClubPage';

interface EditClubPageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page: FC<EditClubPageProps> = async ({ params }) => {
  const id = (await params).id;
  const club = await getClubById(id);

  return <EditClubPage club={club} />;
};

export default Page;
