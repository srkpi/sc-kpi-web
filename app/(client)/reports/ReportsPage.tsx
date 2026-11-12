'use client';

import { useState } from 'react';

import FilterSelect from '@/components/reports/filter-select';
import ReportCard from '@/components/reports/report-card';
import ReportsFilters from '@/components/reports/reports-filters';
import { Button } from '@/components/ui/button';
import { pluralize } from '@/lib/helpers';
import { Report, ReportCategory } from '@/types/report';

const getYear = (report: Report) =>
  new Date(report.publishedAt).getUTCFullYear();

interface Props {
  reports: Report[];
  categories: ReportCategory[];
}

const ReportsPage = ({ reports, categories }: Props) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [selectedYear, setSelectedYear] = useState<number>();

  const years = [...new Set(reports.map(getYear))];

  const filteredReports = reports.filter(
    report =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategoryId || report.category.id === selectedCategoryId) &&
      (!selectedYear || getYear(report) === selectedYear),
  );

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  return (
    <>
      <p className="text-m-p md:text-p text-muted-foreground mb-[30px] md:mb-[45px]">
        Усі звіти Студентської ради КПІ у PDF – переглядай онлайн або
        завантажуй.
      </p>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5">
        <ReportsFilters
          search={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          categoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        >
          <FilterSelect
            label="Рік"
            value={selectedYear}
            options={years.map(year => ({
              value: year.toString(),
              label: year,
            }))}
            onChange={year => setSelectedYear(year ? +year : undefined)}
          />
        </ReportsFilters>
        <p className="shrink-0 text-m-p md:text-l-p text-muted-foreground">
          Знайдено{' '}
          {pluralize(filteredReports.length, ['звіт', 'звіти', 'звітів'])}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-7 mt-[30px] md:mt-[60px]">
        {filteredReports.slice(0, visibleCount).map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      {visibleCount < filteredReports.length && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={handleShowMore}>
            Показати ще
          </Button>
        </div>
      )}
    </>
  );
};

export default ReportsPage;
