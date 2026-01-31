'use client';

import { useEffect, useState } from 'react';

import { getSkillsList } from '@/app/actions/skills.actions';
import { getStatusesList } from '@/app/actions/statuses.actions';
import ProjectCard from '@/components/projects/project-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Project } from '@/types/project';
import { Skill } from '@/types/skill';
import { Status } from '@/types/status';

interface Props {
  projects: Project[];
}

const ProjectsPage = ({ projects }: Props) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setSkills(await getSkillsList());
      setStatuses(await getStatusesList());
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterByCategoryAndSearch = () => {
      let filtered = projects;

      if (selectedSkill) {
        filtered = filtered.filter(project =>
          project.skills.some(skill => skill.name === selectedSkill),
        );
      }

      if (searchTerm) {
        filtered = filtered.filter(project =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      if (selectedStatus) {
        filtered = filtered.filter(
          project => project.status.name === selectedStatus,
        );
      }

      filtered.sort((a, b) => {
        if (a.image && !b.image) {
          return -1;
        }

        if (!a.image && b.image) {
          return 1;
        }

        return 0;
      });

      setFilteredProjects(filtered);
    };

    filterByCategoryAndSearch();
  }, [searchTerm, projects, selectedSkill, selectedStatus]);

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 gap-3 lg:flex md:items-center lg:gap-5 lg:h-[48px]">
        <Input
          placeholder="Пошук"
          className="w-full xl:w-[400px] h-[40px] max-w-full rounded-[6px] lg:max-w-[406px]"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <Select
          value={selectedSkill}
          onValueChange={value => setSelectedSkill(value)}
        >
          <SelectTrigger className="w-full lg:max-w-[250px]">
            <SelectValue placeholder="Навички" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="md:hidden bg-white">
              Всі навички
            </SelectItem>
            {skills.map(skill => (
              <SelectItem key={skill.name} value={skill.name}>
                {skill.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedStatus}
          onValueChange={value => setSelectedStatus(value)}
        >
          <SelectTrigger className="w-full lg:max-w-[250px]">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="md:hidden bg-white">
              Всі статуси
            </SelectItem>
            {statuses.map(status => (
              <SelectItem key={status.name} value={status.name}>
                {status.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(selectedSkill || selectedStatus) && (
          <Button
            variant="outline"
            size="sm"
            className="w-full lg:w-auto h-[40px] lg:h-[45px]"
            onClick={e => {
              e.stopPropagation();
              setSelectedSkill('');
              setSelectedStatus('');
            }}
          >
            X
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-7 mt-[30px] md:mt-[60px]">
        {filteredProjects.slice(0, visibleCount).map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {visibleCount < filteredProjects.length && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="font-button bg-blue text-white px-6 py-3 rounded-lg hover:bg-accent transition"
            onClick={handleShowMore}
          >
            Показати ще
          </Button>
        </div>
      )}
    </>
  );
};

export default ProjectsPage;
