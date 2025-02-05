import { FC } from 'react';

import EditClubPage from '@/app/admin/clubs/[id]/EditClubPage';
import { api } from '@/lib/api';
import { Club } from '@/types/club';

interface EditClubPageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page: FC<EditClubPageProps> = async ({ params }) => {
  const id = (await params).id;
  const { data } = await api.get<Club>(`/clubs/${id}`);

  return <EditClubPage club={data} />;
};

export default Page;
