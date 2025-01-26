'use client';

import { FC, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import CreateModal from '@/components/admin/create-project-modal';
import EditModal from '@/components/admin/edit-project-modal';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast/use-toast';
import CLUB_CATEGORIES from '@/constants/club-categories';
import { api } from '@/lib/api';
import { Club, ClubProject } from '@/types/club';

interface EditClubPageProps {
  club: Club;
}

const EditClubPage: FC<EditClubPageProps> = ({ club }) => {
  const [selectedCategory, setSelectedCategory] = useState(club.category);
  const [projects, setProjects] = useState<ClubProject[]>(club.projects);

  const [file, setFile] = useState<File | null>(null);

  const [updatedClub, setUpdatedClub] = useState<Partial<Club>>({});

  const { toast } = useToast();

  useEffect(() => {
    if (selectedCategory) {
      setUpdatedClub(prev => ({ ...prev, category: selectedCategory }));
    }
  }, [selectedCategory]);

  const handleDelete = async (projectId: number) => {
    try {
      await api.delete(`/clubs/projects/${projectId}`);
      setProjects(projects.filter(project => project.id !== projectId));

      toast({
        title: 'Проєкт успішно видалений',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося видалити проєкт',
          description: error.message,
        });
      }
    }
  };

  const handleChange = (field: keyof Club, value: string) => {
    setUpdatedClub(prev => ({ ...prev, [field]: value }));
  };

  console.log(file);

  const handleSave = async () => {
    if (!club) return;

    try {
      await api.patch('/clubs', {
        id: club.id,
        ...updatedClub,
      });

      const formData = new FormData();
      if (file) {
        formData.append('image', file);
        await api.patch(`/clubs/image/${club.id}`, formData);
      }

      toast({
        title: `Студ. об'єднання успішно оновлено`,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Сталася помилка при оновленні проєкту',
          description: error.message,
        });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-[57px]">
        <h1 className="text-h1 font-semibold">Редагування</h1>
        <Button
          variant="default"
          className="w-[120px] h-[55px]"
          onClick={handleSave}
        >
          Зберегти все
        </Button>
      </div>

      <div className="flex gap-[24px] font-medium">
        <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
          <h2 className="text-h2 mb-[19px]">Назва Студ. об'єднання</h2>
          <Textarea
            className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Назва студ. об'єднання"
            defaultValue={club?.name || ''}
            onChange={e => handleChange('name', e.target.value)}
          />
        </div>
        <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
          <h2 className="text-h2 mb-[19px]">Стислий опис</h2>
          <Textarea
            className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Тут має бути стислий опис"
            defaultValue={club?.shortDescription || ''}
            onChange={e => handleChange('shortDescription', e.target.value)}
          />
        </div>
        <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
          <h2 className="text-h2 mb-[19px]">Посилання на вступ</h2>
          <Textarea
            className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Тут має бути посилання на вступ"
            defaultValue={club?.buttonLink || ''}
            onChange={e => handleChange('buttonLink', e.target.value)}
          />
        </div>
      </div>
      <ImageUpload photoSrc={club.image} onFileUpload={setFile} />

      <div className="flex justify-between w-full">
        <div className="flex flex-col items-start w-[1044px] h-[313px] p-[25px] px-[24px] pb-[31px] gap-[20px] border-[1px] border-white rounded-[18px] mt-[24px]">
          <h2 className="text-h2 font-medium">Опис студ. об'єднання</h2>
          <Textarea
            className="w-[996px] h-[209px] p-[18px] bg-greyBlue rounded-[18px] border-none"
            placeholder="Введіть опис студ. об'єднання тут..."
            defaultValue={club?.description || ''}
            onChange={e => handleChange('description', e.target.value)}
          />
        </div>
        <Select
          onValueChange={value => setSelectedCategory(value)}
          value={selectedCategory}
        >
          <SelectTrigger className="w-[193px] h-[40px] mt-6">
            <SelectValue placeholder="Категорія" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="md:hidden bg-white">
              Всі категорії
            </SelectItem>
            {CLUB_CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-[47px] mb-[45px]">
        <h2 className="text-h2 font-semibold">Проєкти</h2>
        <Table className="w-[1273px]">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <EditModal project={project} />
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
      </div>

      <CreateModal id={club.id} variant="club" />
    </div>
  );
};

export default EditClubPage;
