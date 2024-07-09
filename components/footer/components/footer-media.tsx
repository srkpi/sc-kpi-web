import { FC } from 'react';
import Link from 'next/link';

import { Item } from '@/components/footer/types';
import { cn } from '@/lib/cn';

interface FooterMediaProps {
  items: Item[];
  className?: string;
}

const FooterMedia: FC<FooterMediaProps> = ({ items, className = '' }) => {
  return (
    <div className={cn(className, 'align-bottom self-start')}>
      <p className="font-m-button mb-[20px] lg:hidden">Соціальні мережі</p>
      <div className="flex gap-[23px]">
        {items.map((item: Item) => (
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
