import { FC } from 'react';
import type { Metadata } from 'next';

import { getDepartmentById } from '@/app/[locale]/actions/department.actions';
import ClubOrDepartmentPage from '@/components/club-or-department/club-or-department';

interface DepartmentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: DepartmentPageProps): Promise<Metadata> {
  const id = (await params).id;
  const department = await getDepartmentById(id);

  return {
    title: `${department.name}`,
    description: department.description,
  };
}

const DepartmentPage: FC<DepartmentPageProps> = async ({ params }) => {
  const id = (await params).id;
  const department = await getDepartmentById(id);
  return <ClubOrDepartmentPage clubOrDepartment={department} />;
};

export default DepartmentPage;
