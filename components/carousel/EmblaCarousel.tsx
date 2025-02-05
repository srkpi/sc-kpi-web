'use client';
import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Fade from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';

import { ClubProject } from '@/types/club';
import { Department, DepartmentProject } from '@/types/departments';

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';

type PropType = {
  slides: Department[] | DepartmentProject[] | ClubProject[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = props => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  console.log('slides', slides);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map(slide => (
            <div className="embla__slide" key={slide.id}>
              <img
                className="embla__slide__img"
                src={slide.image}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : '',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
