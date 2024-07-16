import { FC } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/cn';
import { LinkItem } from '@/types/link-item';

interface FooterColumnProps {
  name?: string;
  items: LinkItem[];
  className?: string;
}

const FooterColumn: FC<FooterColumnProps> = ({
  name,
  items,
  className = '',
}) => {
  return (
    <div className={cn(className, 'max-w-[371px] mb-[40px] lg:[50px]')}>
      {name && (
        <p className="font-m-button text-m-p md:text-p lg:font-button mb-[21px]">
          {name}
        </p>
      )}
      <div className="flex flex-col gap-[15px]">
        {items.map((item: LinkItem) => (
          <Link
            className="flex text-m-p md:text-p"
            key={item.name}
            href={item.href}
          >
            {item.icon && <span className="mr-[10px]">{item.icon}</span>}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterColumn;
