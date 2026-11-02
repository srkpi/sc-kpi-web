import { getReportCategories } from '@/app/actions/report-categories.actions';
import { getReportList } from '@/app/actions/reports.actions';
import ReportsPage from '@/app/admin/reports/ReportsPage';

export default async function Page() {
  const [reports, categories] = await Promise.all([
    getReportList(),
    getReportCategories(),
  ]);
  return <ReportsPage reports={reports} categories={categories} />;
}
