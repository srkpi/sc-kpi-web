'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast/use-toast';
import CLUB_CATEGORIES from '@/constants/club-categories';
import { api } from '@/lib/api';
import { Club } from '@/types/club';

interface EditClubPageProps {
  club: Club;
}

export default function EditClubPage({ club }: EditClubPageProps) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const { toast } = useToast();

  const handleDelete = async (projectId: number) => {
    try {
      await api.delete(`/clubs/projects/${projectId}`);
      router.refresh();

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
    category: z.string(),
  });

  type FormData = z.infer<typeof FormSchema>;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: club.name,
      description: club.description,
      buttonLink: club.buttonLink,
      shortDescription: club.shortDescription,
      category: club.category,
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      await api.patch('/clubs', {
        id: club.id,
        ...data,
      });

      const formData = new FormData();
      if (file) {
        formData.append('image', file);
        await api.patch(`/clubs/image/${club.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      toast({
        title: `Студ. об'єднання успішно оновлено`,
      });
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Категорія" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all" className="md:hidden bg-white">
                      Всі категорії
                    </SelectItem>
                    {CLUB_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <FormControl>
                    <Textarea
                      className="h-[120px]"
                      placeholder="Введіть опис департаменту"
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
                <FormItem className="my-6 grid w-full items-center gap-2">
                  <FormLabel htmlFor="shortDescription">Стислий опис</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[120px] placeholder-top"
                      placeholder="Тут має бути стислий опис"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h2 className="text-h2 font-semibold">Проєкти</h2>
          <Table>
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
        </form>
      </Form>
      <CreateModal id={club.id} variant="club" />
    </>
  );
}
