import { FC } from 'react';
import Link from 'next/link';

import { Item } from '@/components/footer/types';

interface FooterColumnProps {
  name?: string;
  items: Item[];
}

const FooterColumn: FC<FooterColumnProps> = ({ name, items }) => {
  return (
    <div className="max-w-[371px]">
      {name && <p className="font-button mb-[21px]">{name}</p>}
      <div className="flex flex-col gap-[15px]">
        {items.map((item: Item) => (
          <Link className="flex" key={item.name} href={item.href}>
            {item.icon && <span className="mr-[10px]">{item.icon}</span>}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterColumn;
