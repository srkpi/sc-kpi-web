import { BicepsFlexed, Layers } from 'lucide-react';

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
