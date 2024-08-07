'use client';

import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/header/header';
import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  return (
    <div className="w-screen h-full">
      <Header />
      <div className="h-screen">
        <div className="flex flex-row h-full max-[1280px]:flex-col">
          <div className="w-full flex flex-row items-center max-[1280px]:h-screen">
            <ErrorMessage />
          </div>
          <div className="w-1/2 h-full flex flex-col self-end items-end justify-end max-[1280px]:w-3/4">
            <Image
              src={'/images/sad_cat.png'}
              alt="Sad cat"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const ErrorMessage = () => {
  return (
    <div className="flex flex-col w-full text-center max-[1280px]:w-screen max-[1280px]:h-1/6">
      <ul className="list-none flex flex-col gap-5 max-[1280px]:gap-3">
        <div className="flex flex-col gap-8">
          <li className="text-8xl text-blue font-semibold">Упссс!</li>
          <li className="text-4xl font-semibold max-[1280px]:text-lg">
            Схоже, щось пішло не так...
          </li>
        </div>
        <li className="font-medium text-center w-full flex items-center justify-center">
          <div className="w-1/2">
            На жаль, під час обробки запиту сталася непередбачена помилка.{' '}
          </div>
        </li>
        <li className="w-full flex justify-center items-center mt-6 max-[1280px]:mt-3">
          <Link href="/" className="w-1/2 max-[1280px]:w-3/4">
            <Button className="min-[389px]:text-[16px] w-full">Головна</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};
