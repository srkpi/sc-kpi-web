import Link from 'next/link';

import { linkItems } from '@/constants/link-items';

const Links = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-evenly gap-[16px] sm:gap-[20px] md:gap-[25px] lg:gap-[45px] xl:gap-[60px] whitespace-nowrap">
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
