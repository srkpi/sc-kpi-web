import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ProtectedAdminRoute from '@/components/auth/ProtectedAdminRoute';

import { navbarLinks } from './constants';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedAdminRoute>
      <div className="p-10">
        <Link href="/">
          <Image
            width={130}
            height={47}
            src="/images/Logo.png"
            alt="Логотип"
            quality={100}
          />
        </Link>
        <div className="flex gap-10">
          <ul className="flex flex-col mt-6 gap-6 h-screen-dvh">
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
          <div className="w-full">{children}</div>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
}
