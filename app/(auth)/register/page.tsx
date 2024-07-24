import React from 'react';
import axios from 'axios';

import RegisterPage from '@/pages/RegisterPage';
import { IFacultyData } from '@/types/faculty.interface';
import { IGroupsResponse } from '@/types/group.interface';

export default async function Register() {
  const facultyPromise = axios.get<IFacultyData[]>(
    'https://api.campus.kpi.ua/subdivision/faculty',
  );
  const groupPromise = axios.get<IGroupsResponse>(
    'https://api.campus.kpi.ua/schedule/groups',
  );

  const [facultyData, groupsData] = await Promise.all([
    facultyPromise,
    groupPromise,
  ]);

  return (
    <RegisterPage faculties={facultyData.data} groups={groupsData.data.data} />
  );
}
