'use client';
import { FC, useState } from 'react';
import { AxiosError } from 'axios';

import CreateModal from '@/components/admin/create-project-modal';
import EditModal from '@/components/admin/edit-project-modal';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
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
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

interface EditDepartmentPageProps {
  department: Department;
}

const EditDepartmentPage: FC<EditDepartmentPageProps> = ({ department }) => {
  const [projects, setProjects] = useState(department.projects);
  const [file, setFile] = useState<File | null>(null);
  const [updatedDepartment, setUpdatedDepartment] = useState<
    Partial<Department>
  >({});

  const { toast } = useToast();

  const handleDelete = async (projectId: number) => {
    try {
      await api.delete(`/departments/projects/${projectId}`);
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
    setUpdatedDepartment(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!department) return;

    try {
      await api.patch('/departments', {
        id: department.id,
        ...updatedDepartment,
      });

      const formData = new FormData();
      if (file) {
        formData.append('image', file);

        await api.patch(`/departments/image/${department.id}`, formData);
      }

      toast({
        title: 'Департамент успішно оновлений',
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
          <h2 className="text-h2 mb-[19px]">Назва департаменту</h2>
          <Textarea
            className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Назва департаменту"
            defaultValue={department?.name || ''}
            onChange={e => handleChange('name', e.target.value)}
          />
        </div>
        <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
          <h2 className="text-h2 mb-[19px]">Стислий опис</h2>
          <Textarea
            className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Тут має бути стислий опис"
            defaultValue={department?.shortDescription || ''}
            onChange={e => handleChange('shortDescription', e.target.value)}
          />
        </div>
        <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
          <h2 className="text-h2 mb-[19px]">Посилання на вступ</h2>
          <Textarea
            className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Тут має бути посилання на вступ"
            defaultValue={department?.buttonLink || ''}
            onChange={e => handleChange('buttonLink', e.target.value)}
          />
        </div>
      </div>

      <ImageUpload photoSrc={department.image} onFileUpload={setFile} />
      <div className="flex flex-col items-start w-[1272px] h-[313px] p-[25px] px-[24px] pb-[31px] gap-[20px] border-[1px] border-white rounded-[18px] mt-[24px]">
        <h2 className="text-h2 font-medium">Опис департаменту</h2>
        <Textarea
          className="w-[1224px] h-[209px] p-[18px] bg-greyBlue rounded-[18px] border-none"
          placeholder="Введіть опис департаменту тут..."
          defaultValue={department?.description || ''}
          onChange={e => handleChange('description', e.target.value)}
        />
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

      <CreateModal id={department.id} variant="department" />
    </div>
  );
};

export default EditDepartmentPage;
