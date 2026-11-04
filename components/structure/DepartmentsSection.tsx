'use client';

import { FC, useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import Image from 'next/image';

import DepartmentPanel from '@/components/structure/DepartmentPanel';
import { Button } from '@/components/ui/button';
import { StructureDepartment } from '@/types/structure-department';

interface DepartmentsSectionProps {
  departments: StructureDepartment[];
}

const DepartmentIcon: FC<{ icon?: string | null; name: string }> = ({
  icon,
  name,
}) =>
  icon ? (
    <Image
      className="h-5 w-5 object-contain"
      src={icon}
      alt={name}
      width={20}
      height={20}
    />
  ) : (
    <LayoutGrid size={20} aria-label={name} />
  );

const DepartmentsSection: FC<DepartmentsSectionProps> = ({ departments }) => {
  const [activeId, setActiveId] = useState(departments[0]?.id);

  if (departments.length === 0) return null;

  const active =
    departments.find(department => department.id === activeId) ??
    departments[0];

  return (
    <section className="mt-[30px] lg:mt-[50px]">
      <h2 className="mb-4 text-h2 font-semibold lg:mb-6">Департаменти</h2>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
        <div
          role="tablist"
          aria-label="Департаменти"
          className="flex gap-2 overflow-x-auto pb-2 lg:w-[210px] lg:shrink-0 lg:flex-col lg:gap-[10px] lg:overflow-visible lg:pb-0"
        >
          {departments.map(department => {
            const isActive = department.id === active.id;

            return (
              <Button
                key={department.id}
                role="tab"
                aria-selected={isActive}
                title={department.name}
                variant="faq"
                size="sm"
                onClick={() => setActiveId(department.id)}
                className={`h-auto min-h-10 max-w-[260px] shrink-0 whitespace-normal rounded px-3 py-2 text-left text-base font-normal not-italic leading-normal lg:w-full lg:max-w-none ${
                  isActive
                    ? 'border-x-[10px] border-[#98c4ee]'
                    : 'border-[#10164b]'
                }`}
              >
                {!isActive && (
                  <span className="lg:hidden">
                    <DepartmentIcon
                      icon={department.image}
                      name={department.name}
                    />
                  </span>
                )}
                <span className={isActive ? undefined : 'hidden lg:inline'}>
                  {department.name}
                </span>
              </Button>
            );
          })}
        </div>
        <DepartmentPanel key={active.id} department={active} />
      </div>
    </section>
  );
};

export default DepartmentsSection;
