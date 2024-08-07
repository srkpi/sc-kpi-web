import React from 'react';
import Image from 'next/image';

import { DepartmentProject } from '@/types/departments';

const DepartmentCardPicture = ({ project }: { project: DepartmentProject }) => {
  return (
    <div className="transition-all hidden md:flex xl:block 2xl:mr-[37px] h-full p-[2px]">
      <div className="max-h-[420px] max-w-[725px] aspect-[36/21] h-full overflow-hidden rounded-[20px]">
        <Image
          className="object-cover w-full h-full"
          width={720}
          height={420}
          quality={100}
          src={project.image}
          alt={project.name}
        />
      </div>
    </div>
  );
};

export default DepartmentCardPicture;
