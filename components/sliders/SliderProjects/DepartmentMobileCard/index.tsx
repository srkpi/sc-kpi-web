import React from 'react';
import Image from 'next/image';

import ArrowLeft from '@/components/sliders/ArrowLeft';
import ArrowRight from '@/components/sliders/ArrowRight';
import { formatProjectIndex } from '@/lib/helpers';
import { DepartmentProject } from '@/types/departments';

interface DepartmentMoblieCardProps {
  project: DepartmentProject;
  next: () => void;
  prev: () => void;
  index: number;
  isArrowsShown: boolean;
}

const DepartmentMoblieCard = ({
  project,
  next,
  prev,
  index,
  isArrowsShown,
}: DepartmentMoblieCardProps) => {
  return (
    <div className="flex md:hidden flex-col gap-5 sm:gap-8 items-center max-w-[500px] mx-auto">
      {isArrowsShown ? (
        <div className="flex gap-1 w-full justify-between items-center">
          <ArrowLeft onClick={prev} />
          <h2 className="font-h3 text-m-h1 sm:text-[24px]">{project.name}</h2>
          <ArrowRight onClick={next} />
        </div>
      ) : (
        <div className="flex gap-1 w-full justify-center items-center">
          <h2 className="font-h3 text-m-h1 sm:text-[24px]">{project.name}</h2>
        </div>
      )}
      <div className="max-h-[420px] aspect-[36/21] overflow-hidden w-[100%] rounded-[20px]">
        <Image
          className="object-cover w-full h-full"
          width={720}
          height={420}
          quality={100}
          src={project.image}
          alt={project.name}
        />
      </div>
      <div className="flex gap-3">
        <h3 className="font-extrabold text-[50px] text-blue opacity-55 leading-[1em]">
          #{formatProjectIndex(index)}
        </h3>
        <div className="pt-[2px]">
          <p className="font-m-p text-m-p sm:text-p">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentMoblieCard;
