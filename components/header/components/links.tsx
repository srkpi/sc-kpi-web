import Link from 'next/link';

import { linkItems } from '@/constants/link-items';

const Links = () => {
  return (
    <div className="w-full flex items-center justify-evenly gap-[40px] md:gap-[60px] lg:gap-[100px]">
      {linkItems.map(item => (
        <Link
          key={item.name}
          href={item.href}
          className="hover:text-blue font-semibold text-l-p sm:text-m-h1 ease-in-out duration-100"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Links;
