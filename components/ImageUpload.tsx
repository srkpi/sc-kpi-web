import React, { useState } from 'react';
import { useRef } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';

const FILE_MAX_SIZE = 25 * 1024 * 1024; //25Mb

interface Props {
  onFileUpload: (file: File) => void;
  photoSrc?: string;
}

const ImageUpload = ({ photoSrc = '', onFileUpload }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [previewImage, setImagePreview] = useState(photoSrc);

  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'Картинку не обрано',
      });
      return;
    }
    if (file.size > FILE_MAX_SIZE) {
      toast({
        variant: 'destructive',
        title: 'Розмір файлу перевищує 25MB',
      });
      return;
    }

    onFileUpload(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex gap-[24px] mt-[24px]">
      <Image
        width={624}
        height={264}
        quality={100}
        src={previewImage}
        alt="Image"
        className="rounded-[18px]"
        ref={imageRef}
      />
      <div className="flex flex-col items-center justify-center w-[624px] bg-greyBlue border-[1px] border-white rounded-[18px] p-[50px] relative cursor-pointer">
        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
          <h2 className="text-h2 mb-[10px] text-center">
            {previewImage
              ? 'Завантажте сюди картинку'
              : 'Ви можете змінити зображення'}
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
  );
};

export default ImageUpload;
