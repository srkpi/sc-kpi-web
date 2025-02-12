import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';

const FILE_MAX_SIZE = 25 * 1024 * 1024; // 25MB

interface Props {
  onFileUpload: (file: File) => void;
  photoSrc?: string;
}

const ImageUpload = ({ photoSrc = '', onFileUpload }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Reference for file input
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

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <div className="flex gap-[24px] h-[100px]">
      <Image
        width={100}
        height={100}
        quality={100}
        src={previewImage ?? ''}
        alt="Image"
        className="rounded-[18px]"
        ref={imageRef}
      />
      <div className="flex flex-col justify-center items-start">
        <p className="text-p mb-[20px] font-light">
          Розмір та формат зображення, яка найкраще підійде для завантаження:
          25MB, JPG, PNG, JPEG.
        </p>
        <Button variant="outline" type="button" onClick={handleButtonClick}>
          {previewImage ? 'Завантажити' : 'Змінити'} зображення
        </Button>
        <Input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
