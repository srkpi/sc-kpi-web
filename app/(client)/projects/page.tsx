import { BicepsFlexed, Layers } from 'lucide-react';
import { Metadata } from 'next';

import SubClientLayout from '@/app/(client)/sub-client-layout';
import { getProjectList } from '@/app/actions/project.actions';
import { BreadcrumbItemType } from '@/components/ui/breadcrumb';

import ProjectsPage from './ProjectsPage';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  {
    icon: Layers,
    href: '/',
    label: 'Головна',
  },
  {
    icon: BicepsFlexed,
    href: '/projects',
    label: 'Проєкти',
  },
];

export const metadata: Metadata = {
  title: 'Проєкти',
  description: 'Дізнайтеся більше про проєкти КПІ.',
};

export default async function Page() {
  const data = await getProjectList();

  return (
    <SubClientLayout pageTitle="Проєкти" breadcrumbs={BREADCRUMBS_ITEMS}>
      <ProjectsPage projects={data} />
    </SubClientLayout>
  );
}
