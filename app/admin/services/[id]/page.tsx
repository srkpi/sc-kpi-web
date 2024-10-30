'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { ArrowDownToLine } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';
import { Service } from '@/types/service';

interface EditServicePageProps {
  params: {
    id: string;
  };
}

const EditServicePage: FC<EditServicePageProps> = ({ params }) => {
  const [service, setService] = useState<Service | undefined>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [updatedService, setUpdatedService] = useState<Partial<Service>>({});

  const imageRef = useRef<HTMLImageElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`/services/${params.id}`);
        setService(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            variant: 'destructive',
            title: `Не вдалося отримати дані служби`,
            description: error.message,
          });
        }
      }
    };

    fetchProjects();
  }, [params.id, toast]);

  const handleChange = (field: keyof Service, value: string) => {
    setUpdatedService(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!service) return;

    try {
      await api.patch('/services', {
        id: service.id,
        ...updatedService,
      });

      const formData = new FormData();
      if (file) {
        formData.append('image', file);

        await api.patch(`/services/image/${params.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      toast({
        title: `Служба успішно оновлена`,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Сталася помилка при оновленні служби',
          description: error.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Сталася невідома помилка при оновленні служби',
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
        <div className="w-[620px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
          <h2 className="text-h2 mb-[19px]">Назва служби</h2>
          <Textarea
            className="w-[570px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Назва служби"
            defaultValue={service?.name || ''}
            onChange={e => handleChange('name', e.target.value)}
          />
        </div>
        <div className="w-[620px] h-[216px] border-[1px] border-white rounded-[18px] p-[25px]">
          <h2 className="text-h2 mb-[19px]">Посилання на вступ</h2>
          <Textarea
            className="w-[570px] h-[120px] bg-greyBlue placeholder-top"
            placeholder="Тут має бути посилання на вступ"
            defaultValue={service?.buttonLink || ''}
            onChange={e => handleChange('buttonLink', e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-[24px] mt-[24px]">
        {(previewImage || service?.image) && (
          <Image
            width={624}
            height={264}
            quality={100}
            src={previewImage || (service?.image as string)}
            alt="Service Image"
            className="rounded-[18px]"
            ref={imageRef}
          />
        )}
        <div className="flex flex-col items-center justify-center w-[624px] bg-greyBlue border-[1px] border-white rounded-[18px] p-[50px] relative cursor-pointer">
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
            <h2 className="text-h2 mb-[10px] text-center">
              {previewImage
                ? 'Завантажте сюди картинку служби'
                : 'Ви можете змінити зображення служби'}
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
        <div className="flex flex-col items-start w-[1280px] h-[313px] p-[25px] px-[24px] pb-[31px] gap-[20px] border-[1px] border-white rounded-[18px] mt-[24px] mb-6">
          <h2 className="text-h2 font-medium">Опис служби</h2>
          <Textarea
            className="w-[1200px] h-[209px] p-[18px] bg-greyBlue rounded-[18px] border-none"
            placeholder="Введіть опис служби тут..."
            defaultValue={service?.description || ''}
            onChange={e => handleChange('description', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditServicePage;
