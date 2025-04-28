import { BicepsFlexed, Layers } from 'lucide-react';
import { Metadata } from 'next';

import ClubsPage from '@/app/(client)/clubs/ClubsPage';
import SubClientLayout from '@/app/(client)/sub-client-layout';
import { getClubList } from '@/app/actions/club.actions';
import { BreadcrumbItemType } from '@/components/ui/breadcrumb';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  {
    icon: Layers,
    href: '/',
    label: 'Головна',
  },
  {
    icon: BicepsFlexed,
    href: '/clubs',
    label: "Cтудентські об'єднання",
  },
];

export const metadata: Metadata = {
  title: "Студентські об'єднання",
  description: "Дізнайтеся більше про студентські об'єднання КПІ.",
};

export default async function Page() {
  const data = await getClubList();

  return (
    <SubClientLayout
      pageTitle="Cтудентські об'єднання"
      breadcrumbs={BREADCRUMBS_ITEMS}
    >
      <ClubsPage clubs={data} />
    </SubClientLayout>
  );
}
