import { FC } from 'react';
import type { Metadata } from 'next';

import { getClubById } from '@/app/[locale]/actions/club.actions';
import ClubOrDepartmentPage from '@/components/club-or-department/club-or-department';

interface ClubPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ClubPageProps): Promise<Metadata> {
  const id = (await params).id;
  const club = await getClubById(id);

  return {
    title: `${club.name}`,
    description: club.description,
  };
}

const ClubPage: FC<ClubPageProps> = async ({ params }) => {
  const id = (await params).id;
  const club = await getClubById(id);

  return <ClubOrDepartmentPage clubOrDepartment={club} />;
};

export default ClubPage;
