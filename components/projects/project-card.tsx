import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

const skillColors: Record<string, string> = {
  // Технічні
  Програмування: '#969CDC',
  'Data-аналітика': '#969CDC',

  // Творчі
  'Графічний дизайн': '#D78292',
  'UX/UI дизайн': '#D78292',
  Малювання: '#D78292',
  'Обробка фото': '#D78292',
  Фотографування: '#D78292',
  'Робота з відео-, аудіо- та світловою технікою': '#D78292',
  Озвучка: '#D78292',
  Блогерство: '#D78292',
  Меморобство: '#D78292',
  'Писати/редагувати тексти': '#D78292',

  // Менеджмент та фінанси
  Менеджмент: '#90CC99',
  'Фінансові обрахунки/облік': '#90CC99',
  'Робота з документами': '#90CC99',

  // Інше
  Комунікація: '#E3A374',
  'Маркетинг/SMM': '#E3A374',
  'Генерація ідей': '#E3A374',
  Правознавство: '#E3A374',
  Соціологія: '#E3A374',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-[#202229] p-[20px] md:p-[33px] rounded-[10px] w-full">
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
