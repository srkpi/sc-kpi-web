'use client';
import React, { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { Department } from '@/types/departments';

import DepartmentCardPicture from './DepartmentCardPicture';
import DepartmentCardText from './DepartmentCardText';
import DepartmentMoblieCard from './DepartmentMobileCard';
import SkeletonDepartmentCard from './SkeletonDepartmentCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/components/sliders/styles.css';

interface SliderDepartmentsProps {
  departments: Department[];
}

const SliderDepartments: React.FC<SliderDepartmentsProps> = ({
  departments,
}) => {
  const [emblaRef1, emblaApi1] = useEmblaCarousel({ loop: true });
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: true });

  const next = useCallback(() => {
    if (emblaApi1 && emblaApi2) {
      emblaApi1.scrollNext();
      emblaApi2.scrollNext();
    }
  }, [emblaApi1, emblaApi2]);

  const previous = useCallback(() => {
    if (emblaApi1 && emblaApi2) {
      emblaApi1.scrollPrev();
      emblaApi2.scrollPrev();
    }
  }, [emblaApi1, emblaApi2]);

  if (!departments.length) {
    return <SkeletonDepartmentCard />;
  }

  const generalSettingsSlider = {
    dots: false,
    infinite: true,
    speed: 300,
    waitForAnimate: true,
    pauseOnHover: true,
    arrows: false,
    swipeToSlide: false,
    slidesToScroll: 1,
  };

  const settingsForSlider1 = {
    autoplaySpeed: 7000,
    autoplay: true,
    slidesToShow: 1,
    fade: true,
  };

  const settingsForSlider2 = {
    className: 'main-slider',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 1,
          fade: true,
        },
      },
    ],
  };

  if (!departments.length) {
    return <SkeletonDepartmentCard />;
  }

  return (
    <div className="relative md:flex">
      <div className="md:w-[45%] 2xl:w-[40%] slider-container md:flex md:flex-col">
        <div className="embla" ref={emblaRef1}>
          <div className="embla__container">
            {departments.map((dep: Department, index: number) => (
              <div className="embla__slide" key={index}>
                <DepartmentCardText dep={dep} next={next} prev={previous} />
                <DepartmentMoblieCard dep={dep} next={next} prev={previous} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-[55%] 2xl:w-[2300px] slider-container relative">
        <div className="absolute hidden 2xl:block right-[-3px] top-0 h-full w-[500px] bg-gradient-to-r from-transparent to-dark to-80% z-10"></div>
        <div className="embla" ref={emblaRef2}>
          <div className="embla__container">
            {departments.map((dep: Department, index: number) => (
              <div className="embla__slide" key={index}>
                <DepartmentCardPicture dep={dep} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderDepartments;
