'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';

import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <div className="w-screen h-full">
      <div className="h-screen">
        <div className="flex flex-row h-screen max-[1280px]:flex-col">
          <div className="w-full flex items-center max-[1280px]:h-screen">
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
                    На жаль, під час обробки запиту сталася непередбачена
                    помилка.{' '}
                  </div>
                </li>
                <li className="w-full flex justify-center items-center mt-6 max-[1280px]:mt-3">
                  <Link href="/" className="w-1/2 max-[1280px]:w-3/4">
                    <Button className="min-[389px]:text-[16px] w-full">
                      Повернутися на головну
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col self-end items-end justify-end max-[780px]:w-1/2 max-[1280px]:w-1/3">
            <Image
              src="/images/sad-cat.gif"
              height={500}
              width={500}
              quality={100}
              alt="Sad cat"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
