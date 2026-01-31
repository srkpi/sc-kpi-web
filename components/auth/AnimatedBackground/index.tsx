'use client';

import { usePathname } from 'next/navigation';

const AnimatedBackground = () => {
  const pathname = usePathname();
  return (
    <div className="fixed h-full w-full left-0 top-0 -z-10">
      <div
        className={`transition-all ease-in-out duration-500 absolute left-0 w-full md:w-1/2 h-[calc(100vh-100px)] bottom-0 md:h-full rounded-t-[40px] md:rounded-tl-none md:rounded-r-[86px] bg-[#323daf] rotate-0 ${(pathname === '/register' || pathname.startsWith('/reset-password')) && 'rotate-180 -translate-y-[100px] md:rotate-0 md:translate-y-0 md:left-1/2 md:-scale-x-100'}`}
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
