'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { ArrowDownToLine } from 'lucide-react';
import Image from 'next/image';

import CreateModal from '@/components/admin/create-project-modal';
import EditModal from '@/components/admin/edit-project-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Department, DepartmentProject } from '@/types/departments';

interface EditClubPageProps {
  params: {
    id: string;
  };
}

const EditClubPage: FC<EditClubPageProps> = ({ params }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [projects, setProjects] = useState<DepartmentProject[]>([]);
  const [club, setClub] = useState<Department | undefined>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [updatedClub, setUpdatedClub] = useState<Partial<Department>>({});

  const imageRef = useRef<HTMLImageElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`/clubs/${params.id}`);
        setClub(response.data);
        setProjects(response.data.projects || []);
        setSelectedCategory(response.data.category || 'all');
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            variant: 'destructive',
            title: `Не вдалося отримати дані студ. об'єднання`,
            description: error.message,
          });
        }
      }
    };

    fetchProjects();
  }, [params.id, toast]);

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

  const handleChange = (field: keyof Department, value: string) => {
    setUpdatedClub(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

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

        await api.patch(`/clubs/image/${params.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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
      } else {
        toast({
          variant: 'destructive',
          title: 'Сталася невідома помилка при оновленні проєкту',
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

      <div className="flex gap-[24px] mt-[24px]">
        {(previewImage || club?.image) && (
          <Image
            width={624}
            height={264}
            quality={100}
            src={previewImage || (club?.image as string)}
            alt="Department Image"
            className="rounded-[18px]"
            ref={imageRef}
          />
        )}
        <div className="flex flex-col items-center justify-center w-[624px] bg-greyBlue border-[1px] border-white rounded-[18px] p-[50px] relative cursor-pointer">
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
            <h2 className="text-h2 mb-[10px] text-center">
              {previewImage
                ? "Завантажте сюди картинку студ. об'єднання"
                : "Ви можете змінити зображення студ. об'єднання"}
            </h2>
            <p className="text-p mb-[20px] text-center font-light">
              Розмір та формат картинки, яка найкраще підійде для завантаження:
              25MB, JPG, PNG, JPEG.
            </p>
            <ArrowDownToLine size={67} color="white" />
            <Input
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
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
            <SelectValue placeholder="Категорія студ. об'єднання" />
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

      <CreateModal id={params.id} variant="club" />
    </div>
  );
};

export default EditClubPage;
