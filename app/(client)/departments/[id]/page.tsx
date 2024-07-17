import { FC } from 'react';

import ClubOrDepartmentPage from '@/components/club-or-department/club-or-department';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

interface DepartmentPageProps {
  params: {
    id: string;
  };
}

const DepartmentPage: FC<DepartmentPageProps> = async ({ params }) => {
  const { data: department } = await api.get<Department>(
    `/departments/${params.id}`,
  );
  return <ClubOrDepartmentPage clubOrDepartment={department} />;
};

export default DepartmentPage;
