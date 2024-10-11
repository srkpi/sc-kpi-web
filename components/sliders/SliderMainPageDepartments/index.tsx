'use client';
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Department } from '@/types/departments';

import '../styles.css';

interface SliderProps {
  departments: Department[];
}

const Slider = ({ departments }: SliderProps) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const slideContentRef = useRef<HTMLDivElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const slidesToRender = [...departments, ...departments];
  const [startX, setStartX] = useState<number | null>(null);

  const moveNext = () => {
    if (slideRef.current && slideContentRef.current) {
      const items = slideRef.current.querySelectorAll(
        '.main-page-slider__item',
      );
      const contentItems = slideContentRef.current.querySelectorAll(
        '.main-page-slider-content__item',
      );
      if (items.length > 0) {
        slideRef.current.appendChild(items[0]);
        slideContentRef.current.appendChild(contentItems[0]);
        setActiveSlideIndex(prevIndex => (prevIndex + 1) % departments.length);
      }
    }
  };

  const movePrev = () => {
    if (slideRef.current && slideContentRef.current) {
      const items = slideRef.current.querySelectorAll(
        '.main-page-slider__item',
      );
      const contentItems = slideContentRef.current.querySelectorAll(
        '.main-page-slider-content__item',
      );
      if (items.length > 0) {
        slideRef.current.prepend(items[items.length - 1]);
        slideContentRef.current.prepend(contentItems[contentItems.length - 1]);
        setActiveSlideIndex(
          prevIndex =>
            (prevIndex - 1 + departments.length) % departments.length,
        );
      }
    }
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const moveTo = async (index: number) => {
    const waitAnimationDuration = 450;
    if (index > activeSlideIndex) {
      for (let i = 0; i < index - activeSlideIndex; i++) {
        moveNext();
        await delay(waitAnimationDuration);
      }
    } else if (index < activeSlideIndex) {
      for (let i = 0; i < activeSlideIndex - index; i++) {
        movePrev();
        await delay(waitAnimationDuration);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.main-page-slider__content')) return;
    setStartX(e.touches[0].clientX);
  };

  const minSwipeDistance = 50;

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startX) return;

    const endX = e.changedTouches[0].clientX;
    if (startX - endX > minSwipeDistance) {
      moveNext();
    } else if (endX - startX > minSwipeDistance) {
      movePrev();
    }
    setStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.main-page-slider__content')) return;
    setStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!startX) return;

    const endX = e.clientX;
    if (startX - endX > minSwipeDistance) {
      moveNext();
    } else if (endX - startX > minSwipeDistance) {
      movePrev();
    }
    setStartX(null);
  };

  return (
    <>
      <div className="relative aspect-[16/9] max-h-[70vh] md:min-h-[500px] w-full">
        <div
          className="main-page-slider"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          ref={slideRef}
        >
          {slidesToRender.map((department: Department) => (
            <div
              key={department.id}
              id={`main-slider-${department.id}`}
              className="main-page-slider__item z-10 absolute bottom-[20%] translate-x-0 translate-y-0 rounded-[6px] sm:rounded-[12px] md:rounded-[16px] lg:rounded-[20px] bg-center bg-cover inline-block duration-500"
              style={{
                backgroundImage: `url(${department.image})`,
              }}
            >
              <div className="main-page-slider__slide-bg h-[calc(100%+2px)] bg-[linear-gradient(180deg,_rgba(57,_56,_56,_0.32)_-6.44%,_var(--dark)_87.29%)] z-10 w-full absolute top-0 left-0 pointer-events-none duration-500"></div>
              <div className="main-page-slider__content z-20 relative md:top-auto md:absolute bottom-[20%] text-left translate-x-0 translate-y-0 w-full left-0 hidden">
                <div className="_container w-full">
                  <div className="w-[45%]">
                    <div className="name font-h1 mb-[30px]">
                      {department.name}
                    </div>
                    <div className="des mb-[40px]">
                      {department.shortDescription}
                    </div>
                    <Link href={`/departments/${department.id}`}>
                      <Button className="min-w-[200px] w-full max-w-[300px] bg-gradient-to-r from-accent to-blue border-none">
                        Дізнатись більше
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <nav className="z-20 flex items-center absolute -translate-y-[15px] sm:translate-y-0 justify-between w-full h-full sm:h-auto sm:w-auto bottom-0 sm:bottom-[8%] left-0 sm:left-1/2 sm:-translate-x-1/2 gap-2">
          <button onClick={movePrev} className="prev">
            <ChevronLeft size={30} />
          </button>
          <ul className="flex gap-[5px] absolute sm:relative bottom-0 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0">
            {departments.map((department: Department, index: number) => (
              <button
                key={department.id}
                className={`w-[6px] h-[6px] sm:w-2 sm:h-2 md:w-3 md:h-3 bg-white rounded-full ${
                  activeSlideIndex !== index && 'opacity-50'
                }`}
                onClick={() => moveTo(index)}
              />
            ))}
          </ul>
          <button onClick={moveNext} className="next">
            <ChevronRight size={30} />
          </button>
        </nav>
      </div>
      <div className="relative" ref={slideContentRef}>
        {slidesToRender.map((department: Department) => (
          <div
            key={department.id}
            id={`main-slider-content-${department.id}`}
            className="main-page-slider-content__item z-10 relative translate-x-0 translate-y-0 inline-block duration-300"
          >
            <div className="main-page-slider__content z-20 hidden w-full max-w-[500px]">
              <div className="_container">
                <div className="name text-[24px] font-semibold mb-[10px]">
                  {department.name}
                </div>
                <div className="des mb-[20px] text-[14px] font-light leading-[118%]">
                  {department.shortDescription}
                </div>
                <Link href={`/departments/${department.id}`}>
                  <Button className="min-w-[200px] w-full py-[11px] text-[16px] font-semibold bg-gradient-to-r from-accent to-blue border-none">
                    Дізнатись більше
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Slider;
