import { FC } from 'react';

import { Button } from '@/components/ui/button';

interface JoinBannerProps {
  href: string;
}

const JoinBanner: FC<JoinBannerProps> = ({ href }) => (
  <section className="mt-[30px] lg:mt-[50px]">
    <div
      className="relative flex flex-col gap-4 rounded-[12px] bg-gray p-4 md:flex-row md:items-center md:justify-between md:gap-6 lg:p-6
        before:pointer-events-none before:absolute before:inset-0 before:rounded-[12px] before:p-[2px] before:content-['']
        before:bg-[linear-gradient(135deg,#f472b6,#fb923c,#facc15,#4ade80,#60a5fa)]
        before:[mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)]
        before:[mask-clip:content-box,border-box]
        before:[mask-composite:exclude]
        before:[-webkit-mask-composite:xor]"
    >
      <div>
        <h2 className="mb-1 text-p font-semibold lg:text-h3">
          Зацікавили тебе? Приєднуйся до нашої команди!
        </h2>
        <p className="text-m-p lg:text-l-p">
          З тобою зв&apos;яжуться впродовж року.
        </p>
      </div>
      <Button asChild className="w-full md:w-auto md:min-w-[220px]">
        <a href={href} target="_blank" rel="noopener noreferrer">
          Подати заявку
        </a>
      </Button>
    </div>
  </section>
);

export default JoinBanner;
