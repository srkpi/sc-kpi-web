import Link from 'next/link';

import { linkItems } from '@/constants/link-items';

const Links = () => {
  return (
    <div className="flex items-center justify-evenly gap-[16px] sm:gap-[32px] md:gap-[36px] lg:gap-[72px] xl:gap-[90px] whitespace-nowrap">
      {linkItems.map(item => (
        <Link
          key={item.name}
          href={item.href}
          className="hover:text-blue font-semibold text-l-p md:text-m-h1 ease-in-out duration-100"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Links;
