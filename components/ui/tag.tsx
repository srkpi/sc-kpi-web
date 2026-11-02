import { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

export default function Tag({ color, className, style, ...props }: TagProps) {
  return (
    <span
      style={{ color, borderColor: color, ...style }}
      className={cn(
        'border-2 px-[10px] md:px-[12px] py-[5px] md:py-[6px] rounded-lg text-[10px] md:text-sm font-medium',
        className,
      )}
      {...props}
    />
  );
}
