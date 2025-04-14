'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Links from '@/components/header/components/links';
import { Button } from '@/components/ui/button';
import { User } from '@/types/auth/user';

interface Props {
  user: User | null;
}

export function Header({ user }: Props) {
  const [open, setOpen] = useState(false);
  const loggedIn = !!user;

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <header className="fixed bg-dark z-[100] w-full">
      <div className="flex justify-between items-center py-[8px] sm:py-[15px] lg:py-[23px] px-[14px] md:px-[24px] lg:px-[64px] xl:px-[100px]">
        <Link href="/">
          <Image
            className="object-cover align-top w-[67px] md:w-[85px] lg:w-[104px] h-auto mr-[12px]"
            src="/images/Logo.png"
            alt="logo"
            quality={100}
            width={104}
            height={38}
          />
        </Link>
        <div className="hidden sm:flex sm:gap-[32px] md:gap-[36px] lg:gap-[72px] xl:gap-[90px] ml-[12px]">
          <Links />
          {loggedIn ? (
            <Link href="/profile">
              <UserIcon size={24} />
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                Увійти
              </Button>
            </Link>
          )}
        </div>
        <div className="flex items-center h-full gap-[9px] sm:hidden">
          {loggedIn && (
            <Link href="/profile" className="sm:hidden">
              <UserIcon size={20} />
            </Link>
          )}
          {open ? (
            <X className="size-[20px] cursor-pointer" onClick={handleOpen} />
          ) : (
            <Menu className="size-[20px] cursor-pointer" onClick={handleOpen} />
          )}
        </div>
      </div>
      {open && (
        <div className="sm:hidden flex-col items-center gap-5 pt-[8px] pb-[30px] sm:[15px] lg:py-[23px] px-[14px] md:px-[32px] lg:px-[64px] xl:px-[100px]">
          {!loggedIn && (
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="w-full font-regular mb-[30px]"
              >
                Увійти
              </Button>
            </Link>
          )}
          <Links />
        </div>
      )}
    </header>
  );
}
