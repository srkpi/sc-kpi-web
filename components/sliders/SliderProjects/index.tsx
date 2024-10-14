'use client';
import React, { useState } from 'react';
import Slider from 'react-slick';

import ArrowLeft from '@/components/sliders/ArrowLeft';
import ArrowRight from '@/components/sliders/ArrowRight';
import { DepartmentProject } from '@/types/departments';

import DepartmentCardPicture from './DepartmentCardPicture';
import DepartmentCardText from './DepartmentCardText';
import DepartmentMoblieCard from './DepartmentMobileCard';
import IconBottomLeftCornerCur from './IconBottomLeftCornerCut';
import SkeletonDepartmentCard from './SkeletonDepartmentCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/components/sliders/styles.css';

const SliderProjects = ({ projects }: { projects: DepartmentProject[] }) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const minProjectsToMakeComplexSlider = 3;
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
    slidesToShow: projects.length < minProjectsToMakeComplexSlider ? 1 : 3,
    fade: projects.length < minProjectsToMakeComplexSlider,
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
  if (!projects.length) {
    return <SkeletonDepartmentCard />;
  }
  return (
    <div
      className={`relative md:flex ${projects.length < minProjectsToMakeComplexSlider ? 'justify-center' : ''}`}
    >
      <div className="md:w-[45%] 2xl:w-[40%] slider-container md:flex md:flex-col">
        <Slider
          asNavFor={nav2 ? nav2 : undefined}
          ref={slider1 => setNav1(slider1)}
          {...generalSettingsSlider}
          {...settingsForSlider1}
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
        </Slider>
      </div>
      <div
        className={`hidden md:block md:w-[55%] ${projects.length >= minProjectsToMakeComplexSlider ? '2xl:w-[2300px] ' : 'max-w-[720px]'} slider-container relative`}
      >
        {projects.length >= minProjectsToMakeComplexSlider && (
          <div className="absolute hidden 2xl:block right-[-3px] top-0 h-full w-[500px] bg-gradient-to-r from-transparent to-dark to-80% z-10"></div>
        )}
        <Slider
          asNavFor={nav1 ? nav1 : undefined}
          ref={slider2 => {
            setNav2(slider2);
          }}
          {...generalSettingsSlider}
          {...settingsForSlider2}
        >
          {projects.map((project: DepartmentProject, index: number) => (
            <React.Fragment key={index}>
              <DepartmentCardPicture
                project={project}
                isMarginRight={
                  projects.length >= minProjectsToMakeComplexSlider
                }
              />
            </React.Fragment>
          ))}
        </Slider>
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
