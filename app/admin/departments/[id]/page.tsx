'use client';

import { FC, useEffect, useState } from 'react';
import { ArrowDownToLine, Plus } from 'lucide-react';

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
import { api } from '@/lib/api';
import { Department, DepartmentProject } from '@/types/departments';

interface EditDepartmentPageProps {
  params: {
    id: string;
  };
}

const EditDepartmentPage: FC<EditDepartmentPageProps> = ({ params }) => {
  const [projects, setProjects] = useState<DepartmentProject[]>([]);
  const [department, setDepartment] = useState<Department | undefined>();
  const [updatedDepartment, setUpdatedDepartment] = useState<
    Partial<Department>
  >({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`/departments/${params.id}`);
        setDepartment(response.data);
        setProjects(response.data.projects || []);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    };

    fetchProjects();
  }, [params.id]);

  const handleDelete = async (projectId: number) => {
    try {
      await api.delete(`/departments/projects/${projectId}`);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
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
      console.log('Department updated successfully');
    } catch (error) {
      console.error('Error updating department:', error);
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
          <h2 className="text-h2 mb-[19px]">Назва відділу</h2>
          <Textarea
            className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Назва відділу"
            defaultValue={department?.name || ''}
            onChange={e => handleChange('name', e.target.value)}
          ></Textarea>
        </div>
        <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
          <h2 className="text-h2 mb-[19px]">Стислий опис</h2>
          <Textarea
            className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Тут має бути стислий опис"
            defaultValue={department?.shortDescription || ''}
            onChange={e => handleChange('shortDescription', e.target.value)}
          ></Textarea>
        </div>
        <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
          <h2 className="text-h2 mb-[19px]">Посилання на вступ</h2>
          <Textarea
            className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Тут має бути посилання на вступ"
            defaultValue={department?.buttonLink || ''}
            onChange={e => handleChange('buttonLink', e.target.value)}
          ></Textarea>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-[1272px] h-[264px] bg-greyBlue border-[1px] border-white rounded-[18px] p-[50px] mt-[24px]">
        <h2 className="text-h2 mb-[10px]">Завантажте сюди картинку відділу</h2>
        <p className="text-p mb-[20px] text-center font-light">
          Розмір та формат картинки, яка найкраще підійде для завантаження:
          25MB, JPG, PNG, JPEG.
        </p>
        <ArrowDownToLine size={67} color="white" />
      </div>
      <div className="flex flex-col items-start w-[1272px] h-[313px] p-[25px] px-[24px] pb-[31px] gap-[20px] border-[1px] border-white rounded-[18px] mt-[24px]">
        <h2 className="text-h2 font-medium">Опис відділу</h2>
        <Textarea
          className="w-[1224px] h-[209px] p-[18px] bg-greyBlue rounded-[18px] border-none"
          placeholder="Введіть опис відділу тут..."
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
                    <Button variant="default" className="w-[110px] h-[35px]">
                      Змінити
                    </Button>
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
      <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mb-[20px]">
        <Plus color="#374FFA" size={26}></Plus>
        Додати проект
      </Button>
    </div>
  );
};

export default EditDepartmentPage;
