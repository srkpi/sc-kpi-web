import Link from 'next/link';

import Documents from '@/components/home/Documents';
import Greeting from '@/components/home/Greeting';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="_container pt-5 md:pt-8 lg:pt-12">
      <section className="flex justify-between w-full gap-5">
        <div className="md:w-[40%] flex flex-col gap-16">
          <div className="flex flex-col gap-16 max-w-[600px]">
            <Greeting />
            <Link href="https://forms.gle/wXVo8zMxSpZZpmQ96">
              <Button size={'sm'} className="self-start">
                Приєднуйся до Студради КПІ
              </Button>
            </Link>
          </div>
          <Documents />
        </div>
        <div className="h-auto w-[60%] max-w-[900px] hidden md:block max-h-[800px]">
          <iframe
            className="relative w-full h-full border-none"
            src="https://xn--r1a.website/s/sr_kpi"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
