'use client';
import React, { useRef } from 'react';

import ArrowLeft from '@/components/sliders/ArrowLeft';
import ArrowRight from '@/components/sliders/ArrowRight';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { DepartmentProject } from '@/types/departments';

import DepartmentCardPicture from './DepartmentCardPicture';
import DepartmentCardText from './DepartmentCardText';
import DepartmentMobileCard from './DepartmentMobileCard';
import IconBottomLeftCornerCur from './IconBottomLeftCornerCut';
import SkeletonDepartmentCard from './SkeletonDepartmentCard';

import '@/components/sliders/styles.css';

interface SliderProjectsProps {
  projects: DepartmentProject[];
}

const SliderProjects: React.FC<SliderProjectsProps> = ({ projects }) => {
  const minProjectsToMakeComplexSlider = 3;

  const textCarouselRef = useRef<CarouselApi | null>(null);
  const imageCarouselRef = useRef<CarouselApi | null>(null);

  if (!projects.length) return <SkeletonDepartmentCard />;

  return (
    <div
      className={`relative md:flex ${projects.length < minProjectsToMakeComplexSlider ? 'justify-center' : ''}`}
    >
      <div className="md:w-[45%] 2xl:w-[40%] slider-container md:flex md:flex-col">
        <Carousel
          setApi={api => (textCarouselRef.current = api)}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index}>
                <DepartmentCardText project={project} index={index} />
                <DepartmentMobileCard
                  isArrowsShown={projects.length > 1}
                  project={project}
                  next={() => {
                    textCarouselRef.current?.scrollNext();
                    imageCarouselRef.current?.scrollNext();
                  }}
                  prev={() => {
                    textCarouselRef.current?.scrollPrev();
                    imageCarouselRef.current?.scrollPrev();
                  }}
                  index={index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div
        className={`hidden md:block md:w-[55%] ${projects.length >= minProjectsToMakeComplexSlider ? '2xl:w-[2300px]' : 'max-w-[720px]'} slider-container relative`}
      >
        {projects.length >= minProjectsToMakeComplexSlider && (
          <div className="absolute hidden 2xl:block right-[-3px] top-0 h-full w-[500px] bg-gradient-to-r from-transparent to-dark to-80% z-10" />
        )}

        <Carousel
          setApi={api => (imageCarouselRef.current = api)}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index}>
                <DepartmentCardPicture
                  project={project}
                  isMarginRight={
                    projects.length >= minProjectsToMakeComplexSlider
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {projects.length > 1 && (
            <div className="flex gap-1 self-end absolute bottom-0 left-0 z-10 px-8 py-5 origin-bottom-left scale-90 lg:scale-100">
              <ArrowLeft
                onClick={() => {
                  textCarouselRef.current?.scrollPrev();
                  imageCarouselRef.current?.scrollPrev();
                }}
              />
              <ArrowRight
                onClick={() => {
                  textCarouselRef.current?.scrollNext();
                  imageCarouselRef.current?.scrollNext();
                }}
              />
              <div className="absolute bottom-[1px] left-[-3px]">
                <IconBottomLeftCornerCur />
              </div>
            </div>
          )}
        </Carousel>
        <div className="absolute h-full w-[2px] bg-dark bottom-0 left-[0px]" />
      </div>
    </div>
  );
};

export default SliderProjects;
