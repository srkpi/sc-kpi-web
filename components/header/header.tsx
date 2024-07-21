'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Links from '@/components/header/components/links';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const iconClassName = 'size-[20px] sm:hidden pointer';

  return (
    <header className="fixed bg-dark z-10 w-full">
      <div className="flex justify-between items-center py-[8px] sm:py-[15px] lg:py-[23px] px-[14px] md:px-[32px] lg:px-[64px] xl:px-[100px]">
        <Link href="/">
          <Image
            className="object-cover align-top w-[67px] md:w-[85px] lg:w-[104px] h-auto"
            src="/images/Logo.png"
            alt="logo"
            width={104}
            height={38}
          />
        </Link>
        <div className="hidden sm:flex">
          <Links />
          <Button variant="outline" size="sm">
            Увійти
          </Button>
        </div>
        {open ? (
          <X className={iconClassName} onClick={handleOpen} />
        ) : (
          <Menu className={iconClassName} onClick={handleOpen} />
        )}
      </div>
      {open && (
        <div className="sm:hidden flex-col items-center gap-5 pt-[8px] pb-[30px] sm:[15px] lg:py-[23px] px-[14px] md:px-[32px] lg:px-[64px] xl:px-[100px]">
          <Button
            variant="outline"
            size="sm"
            className="w-full font-regular mb-[30px]"
          >
            Увійти
          </Button>
          <Links />
        </div>
      )}
    </header>
  );
};

export default Header;
