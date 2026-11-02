import { ReactNode } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ALL = 'all';

interface Option {
  value: string;
  label: ReactNode;
}

interface Props {
  label: string;
  value?: string | number;
  options: Option[];
  onChange: (value?: string) => void;
}

export default function FilterSelect({
  label,
  value,
  options,
  onChange,
}: Props) {
  return (
    <Select
      value={value?.toString() ?? ALL}
      onValueChange={newValue =>
        onChange(newValue === ALL ? undefined : newValue)
      }
    >
      <SelectTrigger className="w-full lg:max-w-[250px] h-[40px] lg:h-[48px] font-regular">
        <span className="flex items-center gap-1 truncate">
          {label}: <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>усі</SelectItem>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
