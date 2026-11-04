'use client';

import { FC, useEffect, useState } from 'react';

import ArrowLeft from '@/components/sliders/ArrowLeft';
import ArrowRight from '@/components/sliders/ArrowRight';
import { type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/cn';

interface CarouselControlsProps {
  api: CarouselApi;
  className?: string;
}

const CarouselControls: FC<CarouselControlsProps> = ({ api, className }) => {
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };

    update();
    api.on('select', update);
    api.on('reInit', update);

    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api]);

  if (count <= 1) return null;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <ArrowLeft onClick={() => api?.scrollPrev()} />
      <div className="flex items-center gap-2">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Перейти до слайда ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === selected ? 'bg-white' : 'bg-greyBlue/50'
            }`}
          />
        ))}
      </div>
      <ArrowRight onClick={() => api?.scrollNext()} />
    </div>
  );
};

export default CarouselControls;
