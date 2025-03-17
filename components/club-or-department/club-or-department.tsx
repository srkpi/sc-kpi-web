import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import SliderProjects from '@/components/sliders/SliderProjects';
import { Button } from '@/components/ui/button';
import { Department } from '@/types/departments';

interface ClubOrDepartmentProps {
  clubOrDepartment: Department;
}

const ClubOrDepartmentPage: FC<ClubOrDepartmentProps> = ({
  clubOrDepartment,
}) => {
  const { name, description, image, projects, buttonLink } = clubOrDepartment;
  return (
    <div className="flex flex-col items-center justify-center pt-[25px] sm:pt-[50px] w-full overflow-x-hidden">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 rounded-[20px] bg-gray w-fit h-full p-0 lg:p-[25px] 2xl:p-[50px] mx-[14px] md:mx-[32px] lg:mx-[64px] xl:mx-[200px] backdrop-blur-[10px]">
        <div className="flex flex-col justify-between px-[18px] py-[20px] lg:p-0">
          <div className="lg:max-w-[400px] xl:max-w-[500px] flex-1">
            <h1 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold mb-[10px] lg:mb-[25px] xl:mb-[50px]">
              {name}
            </h1>
            <p className="text-m-p lg:text-p mt-[21.5px]">{description}</p>
          </div>
          <Link href={buttonLink}>
            <Button className="w-full lg:w-[300px] mt-[14.5px]" size="sm">
              Вступити
            </Button>
          </Link>
        </div>
        <Image
          className="mx-auto rounded-[20px] object-cover order-first lg:order-last"
          src={image}
          alt="image"
          quality={100}
          width={400}
          height={400}
        />
      </section>
      {projects.length > 0 && (
        <section className="relative w-full mx-auto pb-[20px] md:pb-[100px] overflow-x-hidden">
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 xl:text-[46px] font-semibold text-center lg:uppercase m-auto w-screen mt-[40px] mb-[20px] lg:mt-[150px] lg:mb-[70px] px-[14px] md:px-[32px] lg:px-[64px] xl:px-[100px]">
            Наші проєкти
          </h2>
          <div className="_container">
            <SliderProjects projects={projects} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ClubOrDepartmentPage;
