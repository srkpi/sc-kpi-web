'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import * as z from 'zod';

import { getCategoriesList } from '@/app/actions/categories.actions';
import {
  deleteClubProject,
  updateClub,
  updateClubImage,
} from '@/app/actions/club.actions';
import CreateModal from '@/components/admin/create-project-modal';
import EditModal from '@/components/admin/edit-project-modal';
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
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/toast/use-toast';
import { Category } from '@/types/category';
import { Club } from '@/types/club';

const EditorComponent = dynamic(() => import('@/components/ui/editor'), {
  ssr: false,
});

interface EditClubPageProps {
  club: Club;
}

const FormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Назва обов’язкова' }),
  description: z.string().min(1, { message: 'Опис обов’язковий' }),
  shortDescription: z.string().min(1, { message: 'Стислий опис обов’язковий' }),
  buttonLink: z
    .string()
    .trim()
    .url('Посилання має бути валідним URL')
    .min(1, { message: 'Посилання на вступ є обов’язковим' }),
  categoriesIds: z.array(z.number()).min(1, 'Оберіть хоча б одну категорію'),
});

type FormData = z.infer<typeof FormSchema>;

export default function EditClubPage({ club }: EditClubPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getCategoriesList());
    };

    fetchCategories();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: club.name,
      description: club.description,
      buttonLink: club.buttonLink,
      shortDescription: club.shortDescription,
      categoriesIds: club.categories.map(category => category.id),
    },
  });

  const handleDeleteProject = async (projectId: number) => {
    try {
      await deleteClubProject(projectId);

      toast({
        title: 'Проєкт успішно видалений',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося видалити проєкт',
          description: error.message,
        });
      }
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      if (file) {
        await updateClubImage(club.id, file);
      }

      await updateClub(club.id, data);

      toast({ title: `Студ. об'єднання успішно оновлено` });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Сталася помилка при оновленні проєкту',
          description: error.message,
        });
      }
    }
  };

  const categoriesOptions: Option[] = categories.map(category => ({
    value: category.id.toString(),
    label: category.name,
  }));

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="flex justify-between mb-[57px]">
            <h1 className="text-h1 font-semibold">Редагування</h1>
            <Button
              variant="default"
              className="w-[120px] h-[55px]"
              type="submit"
            >
              Зберегти все
            </Button>
          </div>
          <ImageUpload photoSrc={club.image} onFileUpload={setFile} />
          <FormField
            control={form.control}
            name="categoriesIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категорія</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={field.value.map(val => {
                      const foundCategory = categories.find(
                        category => category.id === val,
                      );
                      return {
                        label: foundCategory ? foundCategory.name : '',
                        value: val.toString(),
                      };
                    })}
                    onChange={opts =>
                      field.onChange(opts.map(opt => +opt.value))
                    }
                    options={categoriesOptions}
                    placeholder="Оберіть категорії"
                  />
                </FormControl>
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
          <div className="flex w-full gap-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="my-6 grid w-full items-center gap-2">
                  <FormLabel htmlFor="description">Опис департаменту</FormLabel>
                  <EditorComponent
                    setText={text => form.setValue('description', text)}
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
                  <FormLabel htmlFor="shortDescription">Стислий опис</FormLabel>
                  <EditorComponent
                    setText={text => form.setValue('shortDescription', text)}
                    initialValue={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h2 className="text-h2 font-semibold">Проєкти</h2>
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Назва</TableHead>
                <TableHead>Опис</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {club.projects.map(project => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <div className="flex space-x-4">
                      <EditModal project={project} />
                      <Button
                        variant="outline"
                        className="w-[110px] h-[35px]"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Видалити
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </Form>
      <CreateModal id={club.id} variant="club" />
    </>
  );
}
