import { Project } from '@/types/project';
import { skillColors } from '@/types/skill';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCarouselCard({ project }: ProjectCardProps) {
  return (
    <div className="relative w-full h-full flex flex-col md:flex-row rounded-[10px] overflow-hidden bg-[#1A232A]">
      {project.image ? (
        <>
          <div className="w-full order-2 md:order-1 md:w-1/2 p-[20px] md:p-[33px] flex flex-col">
            <div
              className="text-[20px] md:text-[32px] lg:text-[40px] font-semibold mb-3 md:mb-4"
              dangerouslySetInnerHTML={{ __html: project.name }}
            />
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-5">
              {project.skills.map(skill => {
                const color = skillColors[skill.name] || '#E3A374';
                return (
                  <span
                    key={skill.id}
                    style={{ color: color, borderColor: color }}
                    className="border-2 px-[10px] md:px-[12px] py-[5px] md:py-[6px] rounded-lg text-[10px] md:text-sm font-medium whitespace-nowrap"
                  >
                    {skill.name}
                  </span>
                );
              })}
            </div>
            <div
              className="text-[14px] leading-[150%] md:text-[16px]"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
          <div className="w-full order-1 md:order-2 md:w-1/2 aspect-[4/3] md:aspect-auto relative">
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </>
      ) : (
        <div className="w-full p-[20px] md:p-[33px] flex flex-col">
          <div
            className="text-[20px] md:text-[32px] lg:text-[40px] font-semibold mb-3 md:mb-4"
            dangerouslySetInnerHTML={{ __html: project.name }}
          />
          <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-5">
            {project.skills.map(skill => {
              const color = skillColors[skill.name] || '#E3A374';
              return (
                <span
                  key={skill.id}
                  style={{ color: color, borderColor: color }}
                  className="border-2 px-[10px] md:px-[12px] py-[5px] md:py-[6px] rounded-lg text-[10px] md:text-sm font-medium whitespace-nowrap"
                >
                  {skill.name}
                </span>
              );
            })}
          </div>
          <div
            className="text-[14px] leading-[150%] md:text-[16px]"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>
      )}
    </div>
  );
}
