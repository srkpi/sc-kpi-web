'use client';

import { FC, useState } from 'react';

import CarouselControls from '@/components/structure/CarouselControls';
import ManagerCard from '@/components/structure/ManagerCard';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Manager } from '@/types/manager';

interface LeadershipSectionProps {
  managers: Manager[];
}

const LeadershipSection: FC<LeadershipSectionProps> = ({ managers }) => {
  const [api, setApi] = useState<CarouselApi>();

  if (managers.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-h2 font-semibold lg:mb-6">Керівництво</h2>
      <Carousel opts={{ loop: true, align: 'start' }} setApi={setApi}>
        <CarouselContent>
          {managers.map(manager => (
            <CarouselItem
              key={manager.id}
              className="basis-[88%] md:basis-1/2 xl:basis-1/3"
            >
              <ManagerCard manager={manager} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-dark lg:w-32" />
      </Carousel>
      <CarouselControls api={api} className="mt-4" />
    </section>
  );
};

export default LeadershipSection;
