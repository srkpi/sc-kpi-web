import { Project } from '@/types/project';
import { skillColors } from '@/types/skill';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-[#151e29] p-[20px] md:p-[33px] rounded-[10px] w-full">
      {project.image && (
        <div className="w-full aspect-[4/3] overflow-hidden mb-2">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full rounded-[10px] object-cover"
          />
        </div>
      )}

      <div
        className="text-[20px] md:text-h1 font-semibold mb-2"
        dangerouslySetInnerHTML={{ __html: project.name }}
      ></div>

      <div className="flex flex-wrap gap-2 md:gap-3 mb-5">
        {project.skills.map(skill => {
          const color = skillColors[skill.name] || '#E3A374';
          return (
            <span
              key={skill.id}
              style={{ color: color, borderColor: color }}
              className="border-2 px-[10px] md:px-[12px] py-[5px] md:py-[6px] rounded-lg text-[10px] md:text-sm font-medium"
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
  );
}
