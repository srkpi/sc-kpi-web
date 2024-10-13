import { ChangeEvent, FC, useState } from 'react';
import { AxiosError } from 'axios';
import { ArrowDownToLine, Plus, X } from 'lucide-react';
import Image from 'next/image';

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
  id: string;
  variant: 'department' | 'club';
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({ id, variant }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState<number>(0);
  const [jsonData, setJsonData] = useState({
    name: '',
    description: '',
  });

  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFile(null);
    setInputKey(prevKey => prevKey + 1);
  };

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

    // Conditionally add departmentId or clubId to jsonData based on variant
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
          <div className="flex gap-[24px] mt-[24px] h-[311px]">
            {previewImage && (
              <div className="relative w-[516px] h-[311px]">
                <Image
                  width={516}
                  height={311}
                  objectFit="cover"
                  src={previewImage}
                  quality={100}
                  alt="Project Image"
                  className="rounded-[18px] h-[311px]"
                />
                <X
                  onClick={handleRemoveImage}
                  size={48}
                  color="white"
                  className="absolute top-2 right-2 p-2 cursor-pointer"
                />
              </div>
            )}
            <div
              className={`flex flex-col items-center justify-center ${
                previewImage ? 'w-[624px]' : 'w-[1048px]'
              } bg-greyBlue border-[1px] border-white rounded-[18px] p-[50px] relative cursor-pointer`}
            >
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <h2 className="text-h2 mb-[10px]">
                  {previewImage
                    ? 'Ви можете змінити зображення проєкту'
                    : 'Завантажте сюди картинку проєкту'}
                </h2>
                <p className="text-p mb-[20px] text-center font-light">
                  Розмір та формат картинки, яка найкраще підійде для
                  завантаження: 25MB, JPG, PNG, JPEG.
                </p>
                <ArrowDownToLine size={67} color="white" />
                <Input
                  key={inputKey}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
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
