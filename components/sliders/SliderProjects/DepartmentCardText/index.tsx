import { formatProjectIndex } from '@/lib/helpers';
import { DepartmentProject } from '@/types/departments';

interface DepartmentCardTextProps {
  project: DepartmentProject;
  index: number;
}

const DepartmentCardText = ({ project, index }: DepartmentCardTextProps) => {
  return (
    <div className="hidden w-full md:flex justify-end flex-col h-full pr-8">
      <div className="max-w-[550px]">
        <h3 className="font-extrabold md:text-[80px] lg:text-[100px] text-blue opacity-55 mb-2 lg:mb-5 leading-[1.15em]">
          #{formatProjectIndex(index)}
        </h3>
        <h2 className="font-h1 mb-3 leading-[1.15em]">{project.name}</h2>
        <p className="font-light md:text-xl lg:text-2xl leading-[1.4em] tracking-[-2%]">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default DepartmentCardText;
