import React, { FC, useState } from 'react';
import { AxiosError } from 'axios';
import { Plus } from 'lucide-react';

import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';

import { useToast } from '../ui/toast/use-toast';

interface CreateProjectModalProps {
  id: number;
  variant: 'department' | 'club';
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({ id, variant }) => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState({
    name: '',
    description: '',
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
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }

    const updatedJsonData = {
      ...jsonData,
      ...(variant === 'department'
        ? { departmentId: Number(id) }
        : { clubId: Number(id) }),
    };

    formData.append('json', JSON.stringify(updatedJsonData));

    const endpoint =
      variant === 'department' ? '/departments/projects' : '/clubs/projects';

    try {
      await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Проєкт успішно створений',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося додати проєкт',
          description: error.message,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mb-[20px]">
          <Plus color="#374FFA" size={26}></Plus>
          Додати проєкт
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1300px] bg-dark border-0 justify-center items-center">
        <div className="flex flex-col gap-[45px] mt-[70px]">
          <Input
            type="text"
            name="name"
            placeholder="Назва проєкту"
            className="p-3 w-[516px] h-[46px] border-0 border-b rounded-none"
            value={jsonData.name}
            onChange={handleInputChange}
          />
          <Textarea
            name="description"
            placeholder="Опис проєкту"
            className="flex w-full h-[80px] p-[8px_12px] items-start gap-[10px] flex-shrink-0 border rounded-[6px]"
            value={jsonData.description}
            onChange={handleInputChange}
          />
          <ImageUpload onFileUpload={setFile} />
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

export default CreateProjectModal;
