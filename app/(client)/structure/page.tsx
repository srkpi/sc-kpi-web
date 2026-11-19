import { House, Users } from 'lucide-react';
import { Metadata } from 'next';

import SubClientLayout from '@/app/(client)/sub-client-layout';
import AreasSection from '@/components/structure/AreasSection';
import DepartmentsSection from '@/components/structure/DepartmentsSection';
import JoinBanner from '@/components/structure/JoinBanner';
import LeadershipSection from '@/components/structure/LeadershipSection';
import { BreadcrumbItemType } from '@/components/ui/breadcrumb';
import { getAreas, getDepartments, getManagers } from '@/lib/structure-api';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  { icon: House, href: '/', label: 'Головна' },
  { icon: Users, href: '/structure', label: 'Структура Студради' },
];

export const metadata: Metadata = {
  title: 'Структура Студради',
  description:
    'Керівництво, напрямки роботи та департаменти Студентської ради КПІ ім. Ігоря Сікорського.',
};

const JOIN_APPLICATION_LINK =
  'https://kpistats.onrender.com/sr_vstup?utm_source=about_btn';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const [managers, areas, departments] = await Promise.all([
    getManagers(),
    getAreas(),
    getDepartments(),
  ]);

  return (
    <SubClientLayout
      pageTitle="Структура Студради"
      breadcrumbs={BREADCRUMBS_ITEMS}
    >
      <LeadershipSection managers={managers} />
      <AreasSection areas={areas} />
      <DepartmentsSection departments={departments} />
      <JoinBanner href={JOIN_APPLICATION_LINK} />
    </SubClientLayout>
  );
}
