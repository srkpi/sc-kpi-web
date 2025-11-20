import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { checkIsAdmin } from '@/app/actions/auth.actions';

import { navbarLinks } from './constants';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect('/');
  }
  return (
    <div className="p-10">
      <Link href="/">
        <Image
          width={130}
          height={47}
          src="/images/Logo.svg"
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
  );
}
