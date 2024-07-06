import { FC } from 'react';
import Link from 'next/link';

import { Item } from '@/components/footer/types';

interface FooterMediaProps {
  items: Item[];
}

const FooterMedia: FC<FooterMediaProps> = ({ items }) => {
  return (
    <div className="flex gap-[23px]">
      {items.map((item: Item) => (
        <Link key={item.name} href={item.href}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default FooterMedia;
