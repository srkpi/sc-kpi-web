'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { linkItems } from '@/constants/link-items';
import useAuth from '@/hooks/useAuth';

const Links = () => {
  const { isAdmin } = useAuth();
  const pathname = usePathname();

  return (
    <div className="w-full flex items-center justify-evenly gap-[24px] md:gap-[60px] lg:gap-[100px]">
      {isAdmin().value && (
        <Link
          href="/admin"
          className="hover:text-blue font-semibold text-l-p sm:text-m-h1 ease-in-out duration-100"
        >
          Admin
        </Link>
      )}
      {linkItems.map(item => (
        <Link
          key={item.name}
          href={item.href}
          className={`hover:text-blue font-semibold text-l-p sm:text-m-h1 ease-in-out duration-100 ${pathname === item.href ? 'text-blue' : ''}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Links;
