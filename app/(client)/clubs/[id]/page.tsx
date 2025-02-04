import { FC } from 'react';

import { getClubById } from '@/app/actions/club.actions';
import ClubOrDepartmentPage from '@/components/club-or-department/club-or-department';

interface ClubPageProps {
  params: {
    id: string;
  };
}

const ClubPage: FC<ClubPageProps> = async ({ params }) => {
  const club = await getClubById(params.id);
  return <ClubOrDepartmentPage clubOrDepartment={club} />;
};

export default ClubPage;
