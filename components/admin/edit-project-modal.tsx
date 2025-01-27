import React, { FC, useState } from 'react';
import { AxiosError } from 'axios';

import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { DepartmentProject } from '@/types/departments';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '../ui/dialog';
import { useToast } from '../ui/toast/use-toast';

interface EditProjectModalProps {
  project: DepartmentProject;
}

const EditProjectModal: FC<EditProjectModalProps> = ({ project }) => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState({
    id: Number(project.id),
    name: project.name,
    description: project.description,
  });

  const { toast } = useToast();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setJsonData({
      ...jsonData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await api.patch('/departments/projects', jsonData);

      const formData = new FormData();
      if (file) {
        formData.append('image', file);

        await api.patch(`/departments/projects/image/${project.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      toast({
        title: 'Проєкт успішно змінений',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося змінити проєкт',
          description: error.message,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[110px] h-[35px]">Змінити</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1300px] bg-dark border-0 justify-center items-center">
        <div className="flex flex-col gap-[45px] mt-[70px]">
          <Input
            type="text"
            name="name"
            placeholder="Назва проєкту"
            className="p-3 w-[516px] h-[46px] border-0 border-b rounded-none"
            defaultValue={project.name}
            value={jsonData.name}
            onChange={handleInputChange}
          />
          <Textarea
            name="description"
            placeholder="Опис проєкту"
            className="flex w-full h-[80px] p-[8px_12px] items-start gap-[10px] flex-shrink-0 border rounded-[6px]"
            defaultValue={project.description}
            value={jsonData.description}
            onChange={handleInputChange}
          />
          <ImageUpload photoSrc={project.image} onFileUpload={setFile} />
        </div>
        <DialogFooter>
          <Button className="w-[141px] h-[51px]" onClick={handleSave}>
            Зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;
