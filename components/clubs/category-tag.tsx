import { cn } from '@/lib/cn';
import { Category } from '@/types/category';

type TagColor = 'red' | 'yellow' | 'green' | 'blue';

const CATEGORY_COLORS: Record<string, TagColor> = {
  наукові: 'yellow',
  мистецькі: 'red',
  танцювальні: 'red',
  розважальні: 'yellow',
  спортивні: 'yellow',
  інженерні: 'blue',
  економічні: 'green',
  соціогуманітарні: 'yellow',
  волонтерські: 'green',
};

const DEFAULT_COLOR: TagColor = 'blue';

const COLOR_CLASSES: Record<TagColor, string> = {
  red: 'border-tag-red text-tag-red',
  yellow: 'border-tag-yellow text-tag-yellow',
  green: 'border-tag-green text-tag-green',
  blue: 'border-tag-blue text-tag-blue',
};

interface CategoryTagProps {
  category: Pick<Category, 'name'>;
  className?: string;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ category, className }) => {
  const color =
    CATEGORY_COLORS[category.name.trim().toLowerCase()] ?? DEFAULT_COLOR;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap border-solid font-regular',
        'h-[33px] rounded-[6px] border-[1.8px] px-3 text-l-p',
        'md:h-[39px] md:rounded-[8px] md:border-[2.1px] md:px-4 md:text-p',
        COLOR_CLASSES[color],
        className,
      )}
    >
      {category.name}
    </span>
  );
};

export default CategoryTag;
