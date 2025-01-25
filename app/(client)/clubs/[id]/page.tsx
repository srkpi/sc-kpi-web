import { FC } from 'react';

import ClubOrDepartmentPage from '@/components/club-or-department/club-or-department';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

interface ClubPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ClubPage: FC<ClubPageProps> = async ({ params }) => {
  const resolvedParams = await params;
  const { data: club } = await api.get<Department>(
    `/clubs/${resolvedParams.id}`,
  );
  console.log(club);
  return <ClubOrDepartmentPage clubOrDepartment={club} />;
};

export default ClubPage;
