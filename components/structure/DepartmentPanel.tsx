import { FC } from 'react';
import Image from 'next/image';

import ProjectsCarousel from '@/components/structure/ProjectsCarousel';
import { Button } from '@/components/ui/button';
import { fullName } from '@/lib/full-name';
import { StructureDepartment } from '@/types/structure-department';

interface DepartmentPanelProps {
  department: StructureDepartment;
}

const DepartmentPanel: FC<DepartmentPanelProps> = ({ department }) => {
  const {
    description,
    gains,
    headFirstName,
    headLastName,
    headImage,
    buttonLink,
    sections = [],
    projects = [],
  } = department;
  const headName = fullName(headLastName, headFirstName);

  return (
    <div
      role="tabpanel"
      className="grid min-w-0 flex-1 gap-6 rounded-[10px] border border-[#98c4ee] p-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:p-6"
    >
      <div className="min-w-0 lg:col-start-1 lg:row-start-1">
        <h3 className="mb-2 text-p font-semibold lg:text-h3">
          Чим ми займаємося?
        </h3>
        <p className="whitespace-pre-line text-m-p lg:text-l-p">
          {description}
        </p>

        {sections.length > 0 && (
          <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            {sections.map(section => (
              <li key={section.id} className="rounded-[10px] bg-gray p-4">
                <h4 className="mb-2 text-p font-semibold break-words">
                  {section.name}
                </h4>
                <p className="text-m-p lg:text-l-p">{section.description}</p>
              </li>
            ))}
          </ul>
        )}

        {gains && (
          <>
            <h3 className="mb-2 mt-6 text-p font-semibold lg:text-h3">
              Що ти отримаєш?
            </h3>
            <p className="whitespace-pre-line text-m-p lg:text-l-p">{gains}</p>
          </>
        )}
      </div>

      {projects.length > 0 && (
        <div className="min-w-0 lg:col-span-2 lg:row-start-2">
          <ProjectsCarousel projects={projects} />
        </div>
      )}

      <aside className="lg:col-start-2 lg:row-start-1">
        <p className="mb-3 hidden text-p font-semibold lg:block">
          Голова департаменту
        </p>
        <div className="flex items-center gap-4">
          {headImage ? (
            <Image
              className="h-16 w-16 shrink-0 rounded-full object-cover"
              src={headImage}
              alt={headName}
              width={64}
              height={64}
            />
          ) : (
            <div className="h-16 w-16 shrink-0 rounded-full bg-greyBlue/30" />
          )}
          <div>
            <p className="text-p font-semibold lg:hidden">
              Голова департаменту
            </p>
            <p className="text-m-p lg:text-l-p">{headName}</p>
          </div>
        </div>
        {buttonLink && (
          <Button asChild size="sm" className="mt-5 w-full">
            <a href={buttonLink} target="_blank" rel="noopener noreferrer">
              Хочу приєднатися!
            </a>
          </Button>
        )}
      </aside>
    </div>
  );
};

export default DepartmentPanel;
