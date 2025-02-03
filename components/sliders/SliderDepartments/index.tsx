'use client';
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Slider, { Slider as SliderComponent } from 'react-slick';

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
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  const next = () => {
    if (!nav1 || !nav2) return;
    nav1.slickNext();
    nav2.slickNext();
  };

  const previous = () => {
    if (!nav1 || !nav2) return;
    nav1.slickPrev();
    nav2.slickPrev();
  };

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
        <SliderComponent
          asNavFor={nav2 ? nav2 : undefined}
          ref={(slider1: React.SetStateAction<Slider | null>) =>
            setNav1(slider1)
          }
          {...generalSettingsSlider}
          {...settingsForSlider1}
          className="flex-auto"
        >
          {departments.map((dep: Department, index: number) => (
            <React.Fragment key={index}>
              <DepartmentCardText dep={dep} next={next} prev={previous} />
              <DepartmentMoblieCard dep={dep} next={next} prev={previous} />
            </React.Fragment>
          ))}
        </SliderComponent>
      </div>
      <div className="hidden md:block md:w-[55%] 2xl:w-[2300px] slider-container relative">
        <div className="absolute hidden 2xl:block right-[-3px] top-0 h-full w-[500px] bg-gradient-to-r from-transparent to-dark to-80% z-10"></div>
        <SliderComponent
          asNavFor={nav1 ? nav1 : undefined}
          ref={(slider2: React.SetStateAction<Slider | null>) => {
            setNav2(slider2);
          }}
          {...generalSettingsSlider}
          {...settingsForSlider2}
        >
          {departments.map((dep: Department) => (
            <React.Fragment key={dep.id}>
              <DepartmentCardPicture dep={dep} />
            </React.Fragment>
          ))}
        </SliderComponent>
      </div>
    </div>
  );
};

export default SliderDepartments;
