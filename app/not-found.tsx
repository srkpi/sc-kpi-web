import Link from 'next/link';

import ServerCrashIcon from '@/components/icons/ServerCrushIcon';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="h-screen content-center grid-cols-2 grid-rows-2 px-[20px] lg:grid lg:pl-[100px]">
      <p className="text-center font-semibold leading-none text-[120px] bg-gradient-to-r from-[#10193D] to-accent bg-clip-text text-transparent ml-auto lg:text-[370px] lg:col-start-1 lg:row-start-1 lg:flex lg:items-end">
        404
      </p>
      <div className="w-full flex justify-center items-center col-start-1 row-start-2">
        <div className="flex flex-col mt-[50px] max-w-[530px] lg:max-w-[580px] lg:mt-0">
          <h1 className="font-semibold font-m-h1 text-center lg:text-h1">
            Ой! Схоже, щось пішло не так.
          </h1>
          <p className="font-m-p font-medium text-center mt-[20px] lg:text-p lg:mt-[10px]">
            Сторінку, яку ви запитували, не вдалося знайти. Будь ласка,
            поверніться на головну сторінку.
          </p>
          <Link className="w-full mt-[30px] lg:mt-[60px]" href="/">
            <Button className="w-full h-[40px] lg:h-[60px]" title="Повернутися">
              Повернутися
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden w-full h-full max-w-[500px] col-start-2 row-start-2 text-accent ml-auto lg:block">
        <ServerCrashIcon />
      </div>
    </div>
  );
}
