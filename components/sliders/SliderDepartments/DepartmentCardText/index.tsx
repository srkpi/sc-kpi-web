import React from 'react';
import Link from 'next/link';

import ArrowLeft from '@/components/sliders/ArrowLeft';
import ArrowRight from '@/components/sliders/ArrowRight';
import { Button } from '@/components/ui/button';
import { Department } from '@/types/departments';

interface DepartmentCardTextProps {
  dep: Department;
  next: () => void;
  prev: () => void;
}

const DepartmentCardText = ({ dep, next, prev }: DepartmentCardTextProps) => {
  return (
    <div className="hidden w-full md:flex flex-col h-full pr-8">
      <div className="max-w-[550px] flex-auto pb-3">
        <h2 className="font-h1 mb-5 lg:mb-12">{dep.name}</h2>
        <p className="department-card__description pb-5 lg:pb-9">
          {dep.shortDescription}
        </p>
        <Link href={`/departments/${dep.id}`}>
          <Button size="sm" className="min-w-[200px] w-full max-w-[300px]">
            Дізнатись більше
          </Button>
        </Link>
      </div>
      <div className="flex gap-1 self-end">
        <ArrowLeft onClick={prev} />
        <ArrowRight onClick={next} />
      </div>
    </div>
  );
};

export default DepartmentCardText;
