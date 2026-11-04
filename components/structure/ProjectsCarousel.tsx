'use client';

import { FC, useState } from 'react';
import Image from 'next/image';

import CarouselControls from '@/components/structure/CarouselControls';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { StructureProject } from '@/types/structure-department';

interface ProjectsCarouselProps {
  projects: StructureProject[];
}

const ProjectsCarousel: FC<ProjectsCarouselProps> = ({ projects }) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div>
      <h3 className="mb-3 text-p font-semibold lg:text-h3">Проєкти</h3>
      <Carousel opts={{ loop: true, align: 'start' }} setApi={setApi}>
        <CarouselContent>
          {projects.map(project => (
            <CarouselItem
              key={project.id}
              className="basis-[88%] sm:basis-[60%] lg:basis-[45%] 2xl:basis-[40%]"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-[10px] bg-gray md:flex-row">
                <div className="relative order-2 min-h-[130px] md:order-1 md:w-[38%] md:shrink-0">
                  {project.image ? (
                    <Image
                      className="object-cover"
                      src={project.image}
                      alt={project.name}
                      sizes="(min-width: 768px) 200px, 100vw"
                      fill
                    />
                  ) : (
                    <div className="h-full w-full bg-greyBlue/30" />
                  )}
                </div>
                <div className="order-1 p-3 md:order-2">
                  <h4 className="mb-2 text-p font-semibold">{project.name}</h4>
                  <p className="text-m-p lg:text-l-p">{project.description}</p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-dark lg:w-24" />
      </Carousel>
      <CarouselControls api={api} className="mt-3" />
    </div>
  );
};

export default ProjectsCarousel;
