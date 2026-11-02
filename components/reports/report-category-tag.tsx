import Tag from '@/components/ui/tag';
import { ReportCategory, reportCategoryColors } from '@/types/report';

interface Props {
  category: Pick<ReportCategory, 'name' | 'color'>;
  className?: string;
}

export default function ReportCategoryTag({ category, className }: Props) {
  return (
    <Tag color={reportCategoryColors[category.color]} className={className}>
      {category.name}
    </Tag>
  );
}
