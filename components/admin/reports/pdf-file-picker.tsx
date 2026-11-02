import { DragEvent, ReactNode } from 'react';

import { toast } from '@/components/ui/toast/use-toast';
import { cn } from '@/lib/cn';

const FILE_MAX_SIZE = 20 * 1024 * 1024; // 20MB

interface Props {
  onFileSelect: (file: File) => void;
  children: ReactNode;
  className?: string;
}

export default function PdfFilePicker({
  onFileSelect,
  children,
  className,
}: Props) {
  const handleFile = (file?: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast({ variant: 'destructive', title: 'Файл має бути у форматі PDF' });
      return;
    }
    if (file.size > FILE_MAX_SIZE) {
      toast({ variant: 'destructive', title: 'Розмір файлу перевищує 20MB' });
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files[0]);
  };

  return (
    <label
      className={cn('cursor-pointer', className)}
      onDragOver={event => event.preventDefault()}
      onDrop={handleDrop}
    >
      {children}
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={event => {
          handleFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
    </label>
  );
}
