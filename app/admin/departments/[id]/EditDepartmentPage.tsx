'use client';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import {
  deleteDepartmentProject,
  deleteDepartmentSection,
  updateDepartment,
  updateDepartmentHeadImage,
  updateDepartmentImage,
} from '@/app/actions/department.actions';
import CreateModal from '@/components/admin/create-project-modal';
import EditModal from '@/components/admin/edit-project-modal';
import SectionModal from '@/components/admin/section-modal';
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
import { STRUCTURE_LIMITS } from '@/constants/structure-limits';
import { stripHtml } from '@/lib/html';
import { requiredText } from '@/lib/required-text';
import { Department } from '@/types/departments';
import { DepartmentSection } from '@/types/structure-department';

const EditorComponent = dynamic(() => import('@/components/ui/editor'), {
  ssr: false,
});

const FormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Назва обов’язкова' }),
  description: z
    .string()
    .min(1, { message: 'Опис обов’язковий' })
    .max(STRUCTURE_LIMITS.departmentName, {
      message: `Максимум ${STRUCTURE_LIMITS.departmentName} символів`,
    }),
  shortDescription: z
    .string()
    .min(1, { message: 'Стислий опис обов’язковий' })
    .max(STRUCTURE_LIMITS.departmentShortDescription, {
      message: `Максимум ${STRUCTURE_LIMITS.departmentShortDescription} символів`,
    }),
  gains: z.string().max(STRUCTURE_LIMITS.departmentGains, {
    message: `Максимум ${STRUCTURE_LIMITS.departmentGains} символів`,
  }),
  headLastName: requiredText(STRUCTURE_LIMITS.personName),
  headFirstName: requiredText(STRUCTURE_LIMITS.personName),
  headMiddleName: z
    .string()
    .trim()
    .max(STRUCTURE_LIMITS.personName, {
      message: `Максимум ${STRUCTURE_LIMITS.personName} символів`,
    }),
  buttonLink: z
    .string()
    .trim()
    .url('Посилання має бути валідним URL')
    .min(1, { message: 'Посилання на вступ є обов’язковим' }),
});

type FormValues = z.infer<typeof FormSchema>;

interface EditDepartmentPageProps {
  department: Department;
}

const EditDepartmentPage: FC<EditDepartmentPageProps> = ({ department }) => {
  const [projects, setProjects] = useState(department.projects);
  const [file, setFile] = useState<File | null>(null);
  const [headFile, setHeadFile] = useState<File | null>(null);
  const router = useRouter();

  const sections = department.sections ?? [];

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

  const handleDeleteSection = async (section: DepartmentSection) => {
    if (!window.confirm(`Видалити відділ «${section.name}»?`)) return;

    try {
      await deleteDepartmentSection(section.id);
      toast({ title: 'Відділ успішно видалено' });
      router.refresh();
    } catch {
      toast({ variant: 'destructive', title: 'Не вдалося видалити відділ' });
    }
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: stripHtml(department.name),
      description: department.description,
      shortDescription: department.shortDescription,
      gains: department.gains ?? '',
      headLastName: department.headLastName ?? '',
      headFirstName: department.headFirstName ?? '',
      headMiddleName: department.headMiddleName ?? '',
      buttonLink: department.buttonLink,
    },
  });

  const handleFormSubmit = async (data: FormValues) => {
    const { headMiddleName, ...rest } = data;
    const payload = {
      ...rest,
      ...(headMiddleName ? { headMiddleName } : {}),
    };

    try {
      if (file) {
        await updateDepartmentImage(department.id, file);
      }
      if (headFile) {
        await updateDepartmentHeadImage(department.id, headFile);
      }

      await updateDepartment(department.id, payload);

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
          <div className="flex flex-wrap gap-[48px]">
            <div className="flex flex-col gap-3">
              <p className="text-p font-semibold">Зображення департаменту</p>
              <ImageUpload photoSrc={department.image} onFileUpload={setFile} />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-p font-semibold">Фото голови департаменту</p>
              <ImageUpload
                photoSrc={department.headImage || undefined}
                onFileUpload={setHeadFile}
              />
            </div>
          </div>
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
          <div className="flex gap-[24px] items-start">
            <FormField
              control={form.control}
              name="headLastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="headLastName">Прізвище голови</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headFirstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="headFirstName">Ім’я голови</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headMiddleName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="headMiddleName">
                    По батькові голови (необов’язково)
                  </FormLabel>
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
          <FormField
            control={form.control}
            name="gains"
            render={({ field }) => (
              <FormItem className="mb-6 grid w-full items-center gap-2">
                <FormLabel htmlFor="gains">Що ти отримаєш?</FormLabel>
                <EditorComponent
                  setText={text => form.setValue('gains', text)}
                  initialValue={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <h2 className="text-h2 font-semibold">Відділи</h2>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead>Опис</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sections.map(section => (
            <TableRow key={section.id}>
              <TableCell>{section.name}</TableCell>
              <TableCell>{section.description}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <SectionModal
                    departmentId={department.id}
                    section={section}
                  />
                  <Button
                    variant="outline"
                    className="w-[110px] h-[35px]"
                    onClick={() => handleDeleteSection(section)}
                  >
                    Видалити
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SectionModal departmentId={department.id} />
      <h2 className="text-h2 font-semibold mt-12">Проєкти</h2>
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
