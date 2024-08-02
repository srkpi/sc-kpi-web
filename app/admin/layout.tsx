import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { navbarLinks } from './constants';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex items-center h-[120px] pl-16">
        <Link href="/">
          <Image width={130} height={47} src="/images/Logo.png" alt="Логотип" />
        </Link>
      </div>
      <div className="flex">
        <ul className="flex flex-col w-[320px] pl-16 pt-[23px] gap-[21px] h-screen">
          {navbarLinks.map(navbarLink => (
            <li
              className="flex items-center gap-4 focus-within:text-blue"
              key={navbarLink.title}
            >
              {navbarLink.icon}
              <Link
                className="text-[24px] font-semibold"
                href={navbarLink.href}
              >
                {navbarLink.title}
              </Link>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </>
  );
}
