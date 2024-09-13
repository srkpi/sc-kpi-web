'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Links from '@/components/header/components/links';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { loggedIn, logout } = useAuth();
  const handleOpen = () => {
    setOpen(!open);
  };

  const iconClassName = 'size-[20px]  cursor-pointer';

  return (
    <header className="fixed bg-dark z-10 w-full">
      <div className="flex justify-between items-center py-[8px] sm:py-[15px] lg:py-[23px] px-[14px] md:px-[32px] lg:px-[64px] xl:px-[100px]">
        <Link href="/">
          <Image
            className="object-cover align-top w-[67px] md:w-[85px] lg:w-[104px] h-auto"
            src="/images/Logo.png"
            alt="logo"
            quality={100}
            width={104}
            height={38}
          />
        </Link>
        <div className="hidden sm:flex sm:gap-[40px] md:gap-[60px] lg:gap-[100px]">
          <Links />
          {loggedIn ? (
            pathname === '/profile' ? (
              <Button variant="outline" onClick={() => logout()} size="sm">
                Вийти
              </Button>
            ) : (
              <Link href="/profile">
                <UserIcon size={24} />
              </Link>
            )
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                Увійти
              </Button>
            </Link>
          )}
        </div>
        <div className="flex items-center h-full gap-[9px] sm:hidden">
          <Link href="/profile" className="sm:hidden">
            <UserIcon size={20} />
          </Link>
          {open ? (
            <X className={iconClassName} onClick={handleOpen} />
          ) : (
            <Menu className={iconClassName} onClick={handleOpen} />
          )}
        </div>
      </div>
      {open && (
        <div className="sm:hidden flex-col items-center gap-5 pt-[8px] pb-[30px] sm:[15px] lg:py-[23px] px-[14px] md:px-[32px] lg:px-[64px] xl:px-[100px]">
          {loggedIn ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="w-full font-regular mb-[30px]"
            >
              Вийти
            </Button>
          ) : (
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
};

export default Header;
