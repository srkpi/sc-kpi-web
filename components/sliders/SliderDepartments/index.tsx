'use client';

import { Carousel } from '@/components/ui/carousel';
import { Department } from '@/types/departments';

import DepartmentCardPicture from './DepartmentCardPicture';
import DepartmentCardText from './DepartmentCardText';
import DepartmentMoblieCard from './DepartmentMobileCard';
import SkeletonDepartmentCard from './SkeletonDepartmentCard';

import '@/components/sliders/styles.css';

interface SliderDepartmentsProps {
  departments: Department[];
}

const SliderDepartments: React.FC<SliderDepartmentsProps> = ({
  departments,
}) => {
  if (!departments.length) {
    return <SkeletonDepartmentCard />;
  }

  return (
    <div className="relative md:flex">
      <div className="md:w-[45%] 2xl:w-[40%] slider-container md:flex md:flex-col">
        <Carousel>
          {departments.map((dep: Department, index: number) => (
            <div key={index}>
              <DepartmentCardText dep={dep} next={() => {}} prev={() => {}} />
              <DepartmentMoblieCard dep={dep} next={() => {}} prev={() => {}} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="hidden md:block md:w-[55%] 2xl:w-[2300px] slider-container relative">
        <div className="absolute hidden 2xl:block right-[-3px] top-0 h-full w-[500px] bg-gradient-to-r from-transparent to-dark to-80% z-10"></div>
        <Carousel>
          {departments.map((dep: Department, index: number) => (
            <DepartmentCardPicture dep={dep} key={index} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SliderDepartments;
