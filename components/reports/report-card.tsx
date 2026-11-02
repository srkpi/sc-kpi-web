import { CalendarDays, Download, ExternalLink, FileText } from 'lucide-react';

import ReportCategoryTag from '@/components/reports/report-category-tag';
import { Button } from '@/components/ui/button';
import { formatDate, formatFileSize } from '@/lib/helpers';
import { Report } from '@/types/report';

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  const fileUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/${report.id}/file`;

  return (
    <div className="bg-[#151e29] p-[20px] md:p-[24px] rounded-[10px] w-full flex flex-col gap-3">
      <div className="flex items-center gap-3 text-m-p md:text-l-p">
        <ReportCategoryTag category={report.category} />
        <span className="flex items-center gap-1 text-muted-foreground">
          <CalendarDays size={16} />
          {formatDate(report.publishedAt)}
        </span>
      </div>

      <h2 className="text-m-h1 md:text-h3 font-semibold">{report.title}</h2>

      <p className="flex items-center gap-1 text-m-p md:text-l-p text-muted-foreground">
        <FileText size={14} />
        PDF · {formatFileSize(report.fileSize)}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        <Button asChild size="sm" className="gap-2">
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} />
            Відкрити
          </a>
        </Button>
        <Button asChild size="sm" variant="outline" className="gap-2">
          <a href={`${fileUrl}?download=true`}>
            <Download size={16} />
            Завантажити
          </a>
        </Button>
      </div>
    </div>
  );
}
