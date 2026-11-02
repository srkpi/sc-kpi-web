import { FileText, Layers } from 'lucide-react';
import { Metadata } from 'next';

import SubClientLayout from '@/app/(client)/sub-client-layout';
import { getReportCategories } from '@/app/actions/report-categories.actions';
import { getReportList } from '@/app/actions/reports.actions';
import { BreadcrumbItemType } from '@/components/ui/breadcrumb';

import ReportsPage from './ReportsPage';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  {
    icon: Layers,
    href: '/',
    label: 'Головна',
  },
  {
    icon: FileText,
    href: '/reports',
    label: 'Звітність',
  },
];

export const metadata: Metadata = {
  title: 'Звітність',
  description: 'Звіти Студентської ради КПІ у PDF.',
};

export default async function Page() {
  const [reports, categories] = await Promise.all([
    getReportList(),
    getReportCategories(),
  ]);

  return (
    <SubClientLayout pageTitle="Звітність" breadcrumbs={BREADCRUMBS_ITEMS}>
      <ReportsPage reports={reports} categories={categories} />
    </SubClientLayout>
  );
}
