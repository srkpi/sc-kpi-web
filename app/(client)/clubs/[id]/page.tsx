import { FC } from 'react';

import { getClubById } from '@/app/actions/club.actions';
import ClubOrDepartmentPage from '@/components/club-or-department/club-or-department';

interface ClubPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ClubPage: FC<ClubPageProps> = async ({ params }) => {
  const id = (await params).id;
  const club = await getClubById(id);
  return <ClubOrDepartmentPage clubOrDepartment={club} />;
};

export default ClubPage;
