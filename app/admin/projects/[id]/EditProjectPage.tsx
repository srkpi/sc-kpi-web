'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import * as z from 'zod';

import {
  updateProject,
  updateProjectImage,
} from '@/app/actions/project.actions';
import { getSkillsList } from '@/app/actions/skills.actions';
import { getStatusesList } from '@/app/actions/statuses.actions';
import CreateModal from '@/components/admin/create-project-modal';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/toast/use-toast';
import { Project } from '@/types/project';
import { Skill } from '@/types/skill';
import { Status } from '@/types/status';

const EditorComponent = dynamic(() => import('@/components/ui/editor'), {
  ssr: false,
});

interface EditProjectPageProps {
  project: Project;
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
  skillsIds: z.array(z.number()).min(1, 'Оберіть хоча б одну навичку'),
  statusId: z.number({ required_error: 'Оберіть статус' }),
});

type FormData = z.infer<typeof FormSchema>;

export default function EditProjectPage({ project }: EditProjectPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setSkills(await getSkillsList());
      setStatuses(await getStatusesList());
    };

    fetchData();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      buttonLink: project.buttonLink,
      shortDescription: project.shortDescription,
      skillsIds: project.skills.map(skill => skill.id),
      statusId: project.status.id,
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      if (file) {
        await updateProjectImage(project.id, file);
      }

      await updateProject(project.id, data);

      toast({ title: `Проєкт успішно оновлено` });
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

  const skillsOptions: Option[] = skills.map(skill => ({
    value: skill.id.toString(),
    label: skill.name,
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
          <ImageUpload photoSrc={project.image} onFileUpload={setFile} />
          <FormField
            control={form.control}
            name="skillsIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Навички</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={field.value.map(val => {
                      const foundSkill = skills.find(skill => skill.id === val);
                      return {
                        label: foundSkill ? foundSkill.name : '',
                        value: val.toString(),
                      };
                    })}
                    onChange={opts =>
                      field.onChange(opts.map(opt => +opt.value))
                    }
                    options={skillsOptions}
                    placeholder="Оберіть навички"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="statusId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Статус</FormLabel>
                <Select
                  onValueChange={value => field.onChange(+value)}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть статус" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.name}
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
      <CreateModal id={project.id} variant="club" />
    </>
  );
}
