import { ReactNode } from 'react';
import { Search } from 'lucide-react';

import FilterSelect from '@/components/reports/filter-select';
import { Input } from '@/components/ui/input';
import { ReportCategory } from '@/types/report';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  categories: ReportCategory[];
  categoryId?: number;
  onCategoryChange: (categoryId?: number) => void;
  children?: ReactNode;
}

export default function ReportsFilters({
  search,
  onSearchChange,
  categories,
  categoryId,
  onCategoryChange,
  children,
}: Props) {
  return (
    <div className="w-full grid grid-cols-1 gap-3 lg:flex lg:items-center lg:gap-5">
      <div className="w-full lg:max-w-[406px]">
        <Input
          placeholder="Пошук за назвою"
          className="h-[40px] lg:h-[48px] rounded-[6px]"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          icon={<Search size={20} />}
        />
      </div>
      {children}
      <FilterSelect
        label="Категорія"
        value={categoryId}
        options={categories.map(category => ({
          value: category.id.toString(),
          label: category.name,
        }))}
        onChange={value => onCategoryChange(value ? +value : undefined)}
      />
    </div>
  );
}
