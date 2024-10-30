'use client';

import React, { FC, useState } from 'react';
import { AxiosError } from 'axios';
import { ArrowDownToLine } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';

const CreateServicePage: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [jsonData, setJsonData] = useState({
    name: '',
    description: '',
    buttonLink: '',
  });
  const router = useRouter();

  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData({
      ...jsonData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast({
        variant: 'destructive',
        title: 'Картинку не обрано',
      });
      return;
    }
    if (!jsonData.name || !jsonData.buttonLink || !jsonData.description) {
      toast({
        variant: 'destructive',
        title: 'Заповніть всі поля',
      });
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: 'Розмір файлу перевищує 25MB',
      });
    }
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (jsonData.buttonLink && !urlPattern.test(jsonData.buttonLink)) {
      toast({
        variant: 'destructive',
        title: 'Посилання має бути валідним URL',
      });
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('json', JSON.stringify(jsonData));

    try {
      const response = await api.post('/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push(`/admin/services/${response.data.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Сталася помилка',
          description: error.response?.data.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Сталася невідома помилка',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="flex justify-between items-center mb-[57px]">
          <h1 className="text-h1 font-semibold">Додавання</h1>
          <Button
            variant="default"
            className="w-[120px] h-[55px]"
            type="submit"
          >
            Додати
          </Button>
        </div>
        <div className="flex gap-[24px] font-medium">
          <div className="w-[620px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
            <h2 className="text-h2 mb-[19px]">Назва служби</h2>
            <Textarea
              className="w-[570px] h-[120px] bg-greyBlue placeholder-top"
              placeholder="Тут має бути назва"
              name="name"
              value={jsonData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-[620px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
            <h2 className="text-h2 mb-[19px]">Посилання на вступ</h2>
            <Textarea
              className="w-[570px] h-[120px] bg-greyBlue placeholder-top"
              placeholder="Тут має бути посилання на вступ"
              name="buttonLink"
              value={jsonData.buttonLink}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex gap-[24px] mt-[24px]">
          {previewImage && (
            <div className="w-[624px]">
              <Image
                width={624}
                height={264}
                src={previewImage}
                quality={100}
                alt="Service Image"
                className="rounded-[18px]"
              />
            </div>
          )}
          <div
            className={`flex flex-col items-center justify-center ${previewImage ? 'w-[624px]' : 'w-full'} bg-greyBlue border-[1px] border-white rounded-[18px] p-[50px] relative cursor-pointer`}
          >
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <h2 className="text-h2 mb-[10px]">
                {previewImage
                  ? 'Завантажте нову картинку служби'
                  : 'Завантажте сюди картинку служби'}
              </h2>
              <p className="text-p mb-[20px] text-center font-light">
                Розмір та формат картинки, яка найкраще підійде для
                завантаження: 25MB, JPG, PNG, JPEG.
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

        <div className="flex flex-col items-start w-[1272px] h-[313px] p-[25px] px-[24px] pb-[31px] gap-[20px] border-[1px] border-white rounded-[18px] mt-[24px]">
          <h2 className="text-h2 font-medium">Опис служби</h2>
          <Textarea
            className="w-[1224px] h-[209px] p-[18px] bg-greyBlue rounded-[18px] border-none"
            placeholder="Введіть опис служби тут..."
            name="description"
            value={jsonData.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </form>
  );
};

export default CreateServicePage;
