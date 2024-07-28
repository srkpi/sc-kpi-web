'use client';

import React, { useState } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';

export default function CreateDepartments() {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState({
    name: '',
    shortDescription: '',
    buttonLink: '',
    description: '',
  });
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
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
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('json', JSON.stringify(jsonData));

    try {
      const response = await api.post('/departments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push(`/departments/${response.data.id}`);
    } catch (error) {
      console.error('Error:', error);
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
          <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
            <h2 className="text-h2 mb-[19px]">Назва відділу</h2>
            <Textarea
              className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
              placeholder="Тут має бути назва"
              name="name"
              value={jsonData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
            <h2 className="text-h2 mb-[19px]">Стислий опис</h2>
            <Textarea
              className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
              placeholder="Тут має бути стислий опис"
              name="shortDescription"
              value={jsonData.shortDescription}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-[408px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
            <h2 className="text-h2 mb-[19px]">Посилання на вступ</h2>
            <Textarea
              className="w-[360px] h-[120px] bg-greyBlue placeholder-top"
              placeholder="Тут має бути посилання на вступ"
              name="buttonLink"
              value={jsonData.buttonLink}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[1272px] h-[264px] bg-greyBlue border-[1px] border-white rounded-[18px] p-[50px] mt-[24px] relative cursor-pointer">
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
            <h2 className="text-h2 mb-[10px]">
              Завантажте сюди картинку відділу
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

        <div className="flex flex-col items-start w-[1272px] h-[313px] p-[25px] px-[24px] pb-[31px] gap-[20px] border-[1px] border-white rounded-[18px] mt-[24px] mb-[145px]">
          <h2 className="text-h2 font-medium">Опис відділу</h2>
          <Textarea
            className="w-[1224px] h-[209px] p-[18px] bg-greyBlue rounded-[18px] border-none"
            placeholder="Введіть опис відділу тут..."
            name="description"
            value={jsonData.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </form>
  );
}
