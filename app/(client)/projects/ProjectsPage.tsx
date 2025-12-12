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

      setFilteredProjects(filtered);
    };

    filterByCategoryAndSearch();
  }, [searchTerm, projects, selectedSkill, selectedStatus]);

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  return (
    <>
      <div className="w-full gap-5 h-[30px] md:h-[48px] flex">
        <Input
          placeholder="Пошук"
          className="w-[400px] h-[30px] md:h-[48px] max-w-full rounded-[6px] md:max-w-[406px]"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <Select
          value={selectedSkill?.toString()}
          onValueChange={value => setSelectedSkill(value)}
        >
          <SelectTrigger className="max-w-[200px] md:max-w-[250px]">
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
          value={selectedStatus?.toString()}
          onValueChange={value => setSelectedStatus(value)}
        >
          <SelectTrigger className="max-w-[200px] md:max-w-[250px]">
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
