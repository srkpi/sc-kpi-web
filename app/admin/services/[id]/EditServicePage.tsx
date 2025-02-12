'use client';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { updateService } from '@/app/actions/service.actions';
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
import { Service } from '@/types/service';

interface EditServicePageProps {
  service: Service;
}

const EditServicePage: FC<EditServicePageProps> = ({ service }) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const FormSchema = z.object({
    name: z.string().trim().min(1, { message: 'Назва служби обов’язкова' }),
    description: z.string().min(1, { message: 'Опис обов’язковий' }),
    buttonLink: z
      .string()
      .trim()
      .url('Посилання має бути валідним URL')
      .min(1, { message: 'Посилання на вступ є обов’язковим' }),
  });

  type FormData = z.infer<typeof FormSchema>;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: service.name,
      description: service.description,
      buttonLink: service.buttonLink,
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);

      await updateService(service.id, data, formData);
    }
    toast({
      title: 'Успішно оновлено',
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <div className="flex justify-between">
          <h1 className="text-h1 font-semibold">Редагування</h1>
          <Button
            variant="default"
            className="w-[120px] h-[55px]"
            type="submit"
          >
            Зберегти все
          </Button>
        </div>
        <ImageUpload photoSrc={service.image} onFileUpload={setFile} />
        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="name">Назва служби</FormLabel>
                <FormControl>
                  <Input placeholder="Тут має бути назва" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="buttonLink"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="buttonLink">Посилання на вступ</FormLabel>
                <FormControl>
                  <Input placeholder="Посилання на вступ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="my-6 grid w-full items-center gap-2">
              <FormLabel htmlFor="description">Опис служби</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[120px]"
                  placeholder="Введіть опис служби"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EditServicePage;
