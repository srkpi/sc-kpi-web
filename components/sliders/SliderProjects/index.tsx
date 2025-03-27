'use client';
import React, { useState, useEffect, useRef } from 'react';
import { EmblaCarouselReact } from 'embla-carousel-react';

import ArrowLeft from '@/components/sliders/ArrowLeft';
import ArrowRight from '@/components/sliders/ArrowRight';
import { DepartmentProject } from '@/types/departments';

import DepartmentCardPicture from './DepartmentCardPicture';
import DepartmentCardText from './DepartmentCardText';
import DepartmentMoblieCard from './DepartmentMobileCard';
import IconBottomLeftCornerCur from './IconBottomLeftCornerCut';
import SkeletonDepartmentCard from './SkeletonDepartmentCard';

import 'embla-carousel-react/embla-carousel.css';
import '@/components/sliders/styles.css';

const SliderProjects = ({ projects }: { projects: DepartmentProject[] }) => {
  const [embla, setEmbla] = useState<any>(null);
  const [emblaNav, setEmblaNav] = useState<any>(null);
  const emblaRef = useRef(null);
  const emblaNavRef = useRef(null);

  const minProjectsToMakeComplexSlider = 3;

  const next = () => {
    if (embla) embla.scrollNext();
    if (emblaNav) emblaNav.scrollNext();
  };

  const previous = () => {
    if (embla) embla.scrollPrev();
    if (emblaNav) emblaNav.scrollPrev();
  };

  const settingsForSlider1 = {
    autoplay: true,
    autoplaySpeed: 7000,
    loop: true,
    align: 'center',
    dragFree: true,
    slidesToScroll: 1,
  };

  const settingsForSlider2 = {
    slidesToShow: projects.length < minProjectsToMakeComplexSlider ? 1 : 3,
    loop: true,
    align: 'start',
    dragFree: true,
    slidesToScroll: 1,
    breakpoints: {
      1536: {
        slidesToShow: 1,
      },
    },
  };

  if (!projects.length) {
    return <SkeletonDepartmentCard />;
  }

  return (
    <div
      className={`relative md:flex ${projects.length < minProjectsToMakeComplexSlider ? 'justify-center' : ''}`}
    >
      <div className="md:w-[45%] 2xl:w-[40%] slider-container md:flex md:flex-col">
        <div ref={emblaRef}>
          <EmblaCarouselReact
            options={settingsForSlider1}
            onInit={setEmbla}
            className="flex-auto"
          >
            {projects.map((project: DepartmentProject, index: number) => (
              <React.Fragment key={index}>
                <DepartmentCardText project={project} index={index} />
                <DepartmentMoblieCard
                  isArrowsShown={projects.length > 1}
                  project={project}
                  next={next}
                  prev={previous}
                  index={index}
                />
              </React.Fragment>
            ))}
          </EmblaCarouselReact>
        </div>
      </div>
      <div
        className={`hidden md:block md:w-[55%] ${projects.length >= minProjectsToMakeComplexSlider ? '2xl:w-[2300px] ' : 'max-w-[720px]'} slider-container relative`}
      >
        {projects.length >= minProjectsToMakeComplexSlider && (
          <div className="absolute hidden 2xl:block right-[-3px] top-0 h-full w-[500px] bg-gradient-to-r from-transparent to-dark to-80% z-10"></div>
        )}
        <div ref={emblaNavRef}>
          <EmblaCarouselReact
            options={settingsForSlider2}
            onInit={setEmblaNav}
          >
            {projects.map((project: DepartmentProject, index: number) => (
              <React.Fragment key={index}>
                <DepartmentCardPicture
                  project={project}
                  isMarginRight={projects.length >= minProjectsToMakeComplexSlider}
                />
              </React.Fragment>
            ))}
          </EmblaCarouselReact>
        </div>
        {projects.length > 1 && (
          <div className="flex gap-1 self-end absolute bottom-0 left-0 z-10 px-8 py-5 origin-bottom-left scale-90 lg:scale-100">
            <ArrowLeft onClick={previous} />
            <ArrowRight onClick={next} />
            <div className="absolute bottom-[1px] left-[-3px]">
              <IconBottomLeftCornerCur />
            </div>
          </div>
        )}
        <div className="absolute h-full w-[2px] bg-dark bottom-0 left-[0px]"></div>
      </div>
    </div>
  );
};

export default SliderProjects;
