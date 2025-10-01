'use client';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

import { deleteProject } from '@/app/actions/project.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/toast/use-toast';
import { Project } from '@/types/project';

interface Props {
  projects: Project[];
}

export default function ProjectsPage({ projects }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Стался помилка при видаленні проєкту`,
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProjects = projects.filter(
    project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <h1 className="text-h1 font-semibold mb-[54px]">Cтудентські проєкти</h1>
      <Input
        className="w-full text-p pl-16 h-[72px] mb-[78px]"
        placeholder="Пошук..."
        value={searchQuery}
        onChange={handleSearchChange}
        icon={<Search />}
        iconPosition="start"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead>Короткий опис</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map(project => (
            <TableRow key={project.id}>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: project.name }} />
              </TableCell>
              <TableCell>
                <div
                  dangerouslySetInnerHTML={{ __html: project.shortDescription }}
                />
              </TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Link href={`/admin/projects/${project.id}`}>
                    <Button variant="default" className="w-[110px] h-[35px]">
                      Змінити
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-[110px] h-[35px]"
                    onClick={() => handleDelete(project.id)}
                  >
                    Видалити
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href="/admin/projects/create">
        <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mt-[24px] mb-[20px]">
          <Plus color="#374FFA" size={26}></Plus>
          Додати студ. проєкт
        </Button>
      </Link>
    </>
  );
}
