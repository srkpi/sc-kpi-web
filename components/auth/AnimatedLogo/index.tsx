'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AnimatedLogo = () => {
  const pathname = usePathname();
  return (
    <div className="absolute top-[20px] md:top-[40px] lg:top-[70px] w-full flex px-[20px] md:px-[40px] lg:px-[70px]">
      <div
        className={`flex-0 transition-all ease-in-out duration-500 ${pathname === '/login' && 'flex-auto'}`}
      />
      <Link className="z-10" href="/">
        <Image
          className="object-cover align-top w-[104px] md:w-[120px] lg:w-[133px] h-auto"
          src="/images/Logo.svg"
          alt="logo"
          quality={100}
          width={133}
          height={50}
        />
      </Link>
    </div>
  );
};

export default AnimatedLogo;
