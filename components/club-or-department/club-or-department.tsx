import { FC } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Department } from '@/types/departments';

interface ClubOrDepartmentProps {
  clubOrDepartment: Department;
}

const ClubOrDepartmentPage: FC<ClubOrDepartmentProps> = ({
  clubOrDepartment,
}) => {
  const { name, description, image } = clubOrDepartment;
  return (
    <div className="flex flex-col items-center justify-center pt-[25px] sm:pt-[50px] w-full">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 rounded-[20px] bg-gray w-fit h-full p-0 lg:p-[25px] 2xl:p-[50px] mx-[14px] md:mx-[32px] lg:mx-[64px] xl:mx-[200px] backdrop-blur-[10px]">
        <div className="flex flex-col justify-between px-[18px] py-[20px] lg:p-0">
          <div className="lg:max-w-[400px] xl:max-w-[500px] flex-1">
            <h1 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold mb-[10px] lg:mb-[25px] xl:mb-[50px]">
              {name}
            </h1>
            <p className="text-m-p lg:text-p mt-[21.5px]">{description}</p>
          </div>
          <Button className="w-full lg:w-[300px] mt-[14.5px]" size="sm">
            Дізнатися більше
          </Button>
        </div>
        <Image
          className="w-full h-auto rounded-[20px] aspect-video object-cover order-first lg:order-last"
          src={image}
          alt="image"
          width={725}
          height={414}
        />
      </section>
    </div>
  );
};

export default ClubOrDepartmentPage;
