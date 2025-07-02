'use client';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import * as z from 'zod';

import { createDepartment } from '@/app/[locale]/actions/department.actions';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast/use-toast';

const EditorComponent = dynamic(() => import('@/components/ui/editor'), {
  ssr: false,
});

const CreateDepartmentPage: FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const { toast } = useToast();

  const FormSchema = z.object({
    name: z.string().trim().min(1, { message: 'Назва обов’язкова' }),
    shortDescription: z
      .string()
      .min(1, { message: 'Стислий опис обов’язковий' }),
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
      name: '',
      description: '',
      shortDescription: '',
      buttonLink: '',
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    formData.append('json', JSON.stringify(data));

    try {
      await createDepartment(formData);
      toast({
        title: 'Департамент успішно додано',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Сталася помилка при створенні департаменту',
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-6 grid w-full items-center gap-2">
                  <FormLabel htmlFor="name">Назва</FormLabel>
                  <EditorComponent
                    setText={text => form.setValue('name', text)}
                    initialValue={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem className="my-6 grid w-full items-center gap-2">
                  <FormLabel htmlFor="shortDescription">
                    Стислий опис департамент
                  </FormLabel>
                  <EditorComponent
                    setText={text => form.setValue('shortDescription', text)}
                    initialValue={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonLink"
              render={({ field }) => (
                <FormItem className="my-6 w-full items-center gap-2">
                  <FormLabel htmlFor="buttonLink">Посилання на вступ</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[120px]"
                      placeholder="Посилання на вступ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ImageUpload onFileUpload={setFile} />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="my-6 grid w-full items-center gap-2">
                <FormLabel htmlFor="description">Опис служби</FormLabel>
                <EditorComponent
                  setText={text => form.setValue('description', text)}
                  initialValue={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CreateDepartmentPage;
