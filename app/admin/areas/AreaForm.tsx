'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import { createArea, updateArea } from '@/app/actions/area.actions';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast/use-toast';
import { STRUCTURE_LIMITS } from '@/constants/structure-limits';
import { Area } from '@/types/area';

const requiredText = (max: number) =>
  z
    .string()
    .trim()
    .min(1, { message: 'Поле обов’язкове' })
    .max(max, { message: `Максимум ${max} символів` });

const FormSchema = z.object({
  name: requiredText(STRUCTURE_LIMITS.areaName),
  headLastName: requiredText(STRUCTURE_LIMITS.personName),
  headFirstName: requiredText(STRUCTURE_LIMITS.personName),
  description: requiredText(STRUCTURE_LIMITS.areaDescription),
});

type FormValues = z.infer<typeof FormSchema>;

const HEAD_FIELDS = [
  { name: 'headLastName', label: 'Прізвище відповідального' },
  { name: 'headFirstName', label: 'Ім’я відповідального' },
] as const;

interface AreaFormProps {
  area?: Area;
}

const AreaForm: FC<AreaFormProps> = ({ area }) => {
  const isEdit = Boolean(area);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: area?.name ?? '',
      headLastName: area?.headLastName ?? '',
      headFirstName: area?.headFirstName ?? '',
      description: area?.description ?? '',
    },
  });

  const descriptionLength = form.watch('description').length;

  const handleFormSubmit = async (data: FormValues) => {
    try {
      if (area) {
        await updateArea(area.id, data, file);
        toast({ title: 'Напрям успішно оновлено' });
        router.refresh();
        return;
      }

      if (!file) {
        toast({ variant: 'destructive', title: 'Додайте фото' });
        return;
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('json', JSON.stringify(data));

      await createArea(formData);
      toast({ title: 'Напрям успішно додано' });
      router.push('/admin/areas');
    } catch {
      toast({
        variant: 'destructive',
        title: isEdit
          ? 'Не вдалося оновити напрям'
          : 'Не вдалося додати напрям',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-h1 font-semibold">
            {isEdit ? 'Редагування' : 'Додавання'}
          </h1>
          <Button
            className="w-[120px] h-[55px]"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {isEdit ? 'Зберегти' : 'Додати'}
          </Button>
        </div>

        <ImageUpload
          photoSrc={area?.image || undefined}
          onFileUpload={setFile}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Назва напряму</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-[24px] items-start">
          {HEAD_FIELDS.map(item => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={item.name}>{item.label}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Опис</FormLabel>
              <FormControl>
                <Textarea className="h-[160px]" {...field} />
              </FormControl>
              <p
                className={
                  descriptionLength > STRUCTURE_LIMITS.areaDescription
                    ? 'text-sm text-red-500'
                    : 'text-sm text-greyBlue'
                }
              >
                {descriptionLength}/{STRUCTURE_LIMITS.areaDescription}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AreaForm;
