import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { ArrowDownToLine, X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';

import { useToast } from '../ui/toast/use-toast';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, id }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState<number>(0);
  const [jsonData, setJsonData] = useState({
    departmentId: Number(id),
    name: '',
    description: '',
  });

  const { toast } = useToast();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    formData.append('json', JSON.stringify(jsonData));

    try {
      await api.post('/departments/projects', formData, {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative w-[1283px] h-[868px] bg-dark shadow-lg p-6 overflow-y-auto">
        <X
          size={48}
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        />
        <div className="flex flex-col gap-[45px] mt-[146px]">
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
            className="flex w-[1048px] h-[80px] p-[8px_12px] items-start gap-[10px] flex-shrink-0 border rounded-[6px]"
            value={jsonData.description}
            onChange={handleInputChange}
          />
          <div className="flex gap-[24px] mt-[24px]">
            {previewImage && (
              <div className="relative w-[624px]">
                <Image
                  width={624}
                  height={264}
                  src={previewImage}
                  alt="Department Image"
                  className="rounded-[18px]"
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
              className={`flex flex-col items-center justify-center ${previewImage ? 'w-[624px]' : 'w-full'} bg-greyBlue border-[1px] border-white rounded-[18px] p-[50px] relative cursor-pointer`}
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
          <div className="flex flex-col gap-[45px]">
            <Button className="w-[141px] h-[51px]" onClick={handleSave}>
              Зберегти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
