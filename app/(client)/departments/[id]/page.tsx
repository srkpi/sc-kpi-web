import { FC } from 'react';

import { getDepartmentById } from '@/app/actions/department.actions';
import ClubOrDepartmentPage from '@/components/club-or-department/club-or-department';

interface DepartmentPageProps {
  params: Promise<{
    id: string;
  }>;
}

const DepartmentPage: FC<DepartmentPageProps> = async ({ params }) => {
  const id = (await params).id;
  const department = await getDepartmentById(id);
  return <ClubOrDepartmentPage clubOrDepartment={department} />;
};

export default DepartmentPage;
