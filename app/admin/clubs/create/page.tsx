'use client';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import { createClub } from '@/app/actions/club.actions';
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
import CLUB_CATEGORIES from '@/constants/club-categories';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

const CreateClubPage: FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

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
    category: z.array(z.string()).min(1, { message: 'Оберіть хоча б одну категорію' }),
  });
  type FormData = z.infer<typeof FormSchema>;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
      buttonLink: '',
      category: [],
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    formData.append('json', JSON.stringify(data));

    try {
      await createClub(formData);
      router.push('/admin/clubs');
      toast({
        title: 'СО успішно створено',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Сталася помилка',
        });
      }
    }
  };

  const categoriesOptions: Option[] = CLUB_CATEGORIES.map(category => ({
    value: category,
    label: category,
  }));

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <div className="flex justify-between items-center ">
          <h1 className="text-h1 font-semibold">Додавання</h1>
          <Button
            variant="default"
            className="w-[120px] h-[55px]"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            Додати
          </Button>
        </div>
        <ImageUpload onFileUpload={setFile} />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <MultipleSelector
                value={field.value}
                onChange={field.onChange}
                options={categoriesOptions}
                placeholder="Оберіть категорії"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="name">Назва</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="description">Опис СО</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[120px]"
                    placeholder="Введіть опис СО"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="shortDescription">Стислий опис</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[120px]"
                    placeholder="Введіть стислий опис"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default CreateClubPage;
