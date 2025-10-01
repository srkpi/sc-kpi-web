import { FC } from 'react';

import { getProjectById } from '@/app/actions/project.actions';
import EditProjectPage from '@/app/admin/projects/[id]/EditProjectPage';

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page: FC<EditProjectPageProps> = async ({ params }) => {
  const id = (await params).id;
  const project = await getProjectById(id);

  return <EditProjectPage project={project} />;
};

export default Page;
