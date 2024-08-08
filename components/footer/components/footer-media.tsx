import { FC } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/cn';
import { LinkItem } from '@/types/link-item';

interface FooterMediaProps {
  items: LinkItem[];
  className?: string;
}

const FooterMedia: FC<FooterMediaProps> = ({ items, className = '' }) => {
  return (
    <div className={cn(className, 'align-bottom self-start')}>
      <p className="font-m-button text-m-p mb-[20px] lg:hidden">
        Соціальні мережі
      </p>
      <div className="flex gap-[10px] md:gap-[20px]">
        {items.map((item: LinkItem) => (
          <Link
            className="size-[15px] md:size-[20px]"
            key={item.href}
            href={item.href}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterMedia;
