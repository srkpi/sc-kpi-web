'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

import {
  createSkill,
  deleteSkill,
  updateSkill,
} from '@/app/actions/skills.actions';
import EntityCreate from '@/components/admin/entities/EntityCreate';
import EntityItem from '@/components/admin/entities/EntityItem';
import { Input } from '@/components/ui/input';
import { Skill } from '@/types/skill';

interface Props {
  skills: Skill[];
}

export default function SkillsPage({ skills }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <h1 className="text-h1 font-semibold mb-8">Навички</h1>
      <Input
        className="w-full text-p pl-16 mb-4"
        placeholder="Пошук..."
        value={searchQuery}
        onChange={handleSearchChange}
        icon={<Search />}
        iconPosition="start"
      />

      <div className="flex flex-col w-full gap-2">
        {filteredSkills.map(skill => (
          <EntityItem
            id={skill.id}
            name={skill.name}
            onUpdate={updateSkill}
            onDelete={deleteSkill}
            key={skill.id}
          />
        ))}
      </div>

      <div className="w-[90%] mx-auto my-5 rounded-full border-t border-greyBlue"></div>

      <EntityCreate onCreate={createSkill} />
    </>
  );
}
