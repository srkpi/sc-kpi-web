'use client';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { createService } from '@/app/[locale]/actions/service.actions';
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

const CreateServicePage: FC = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

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
      name: '',
      description: '',
      buttonLink: '',
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      const payload = {
        image: file,
        json: JSON.stringify(data),
      };

      await createService(payload);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Сталася помилка',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
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
                <FormLabel htmlFor="name">Назва служби</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[120px] placeholder-top"
                    placeholder="Тут має бути назва"
                    {...field}
                  />
                </FormControl>
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

export default CreateServicePage;
