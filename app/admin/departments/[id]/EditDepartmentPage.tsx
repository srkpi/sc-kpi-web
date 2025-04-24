'use client';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import * as z from 'zod';

import {
  deleteDepartmentProject,
  updateDepartment,
  updateDepartmentImage,
} from '@/app/actions/department.actions';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/toast/use-toast';
import { Department } from '@/types/departments';

const EditorComponent = dynamic(() => import('@/components/ui/editor'), {
  ssr: false,
});

interface EditDepartmentPageProps {
  department: Department;
}

const EditDepartmentPage: FC<EditDepartmentPageProps> = ({ department }) => {
  const [projects, setProjects] = useState(department.projects);
  const [file, setFile] = useState<File | null>(null);

  const { toast } = useToast();

  const handleDelete = async (projectId: number) => {
    try {
      await deleteDepartmentProject(projectId);
      setProjects(projects.filter(project => project.id !== projectId));
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

  const FormSchema = z.object({
    name: z.string().trim().min(1, { message: 'Назва обов’язкова' }),
    description: z.string().min(1, { message: 'Опис обов’язковий' }),
    shortDescription: z
      .string()
      .min(1, { message: 'Стислий опис обов’язковий' }),
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
      name: department.name,
      description: department.description,
      buttonLink: department.buttonLink,
      shortDescription: department.shortDescription,
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      if (file) {
        await updateDepartmentImage(department.id, file);
      }

      await updateDepartment(department.id, data);

      toast({ title: 'Департамент успішно оновлено' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Сталася помилка при оновленні департаменту',
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="flex justify-between">
            <h1 className="text-h1 font-semibold">Редагування</h1>
            <Button
              disabled={form.formState.isSubmitting}
              className="w-[120px] h-[55px]"
              type="submit"
            >
              Зберегти все
            </Button>
          </div>
          <ImageUpload photoSrc={department.image} onFileUpload={setFile} />
          <div className="flex gap-[24px] mt-6 items-start">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="name">Назва департаменту</FormLabel>
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
          <div className="flex gap-[24px]">
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
        </form>
      </Form>
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
          {projects.map(project => (
            <TableRow key={project.id}>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: project.name }} />
              </TableCell>
              <TableCell>
                <div
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <EditModal project={project} />
                  <Button
                    variant="outline"
                    className="w-[110px] h-[35px]"
                    onClick={() => handleDelete(project.id)}
                  >
                    Видалити
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateModal id={department.id} variant="department" />
    </>
  );
};

export default EditDepartmentPage;
