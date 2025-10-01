'use client';

import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import { createProject } from '@/app/actions/project.actions';
import { getSkillsList } from '@/app/actions/skills.actions';
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
import { useToast } from '@/components/ui/toast/use-toast';
import { Skill } from '@/types/skill';

const EditorComponent = dynamic(() => import('@/components/ui/editor'), {
  ssr: false,
});

const CreateProjectPage: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  const router = useRouter();

  const { toast } = useToast();

  useEffect(() => {
    const fetchSkills = async () => {
      setSkills(await getSkillsList());
    };

    fetchSkills();
  }, []);

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
    skillsIds: z
      .array(z.number())
      .min(1, { message: 'Оберіть хоча б одну навичку' }),
  });
  type FormData = z.infer<typeof FormSchema>;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
      buttonLink: '',
      skillsIds: [] as number[],
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    formData.append('json', JSON.stringify(data));

    try {
      await createProject(formData);
      router.push('/admin/projects');
      toast({
        title: 'Проєкт успішно створено',
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

  const skillsOptions: Option[] = skills.map(skill => ({
    value: skill.id.toString(),
    label: skill.name,
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
          name="skillsIds"
          render={({ field }) => (
            <FormItem>
              <MultipleSelector
                value={field.value.map(val => {
                  const foundSkill = skills.find(skill => skill.id === val);
                  return {
                    label: foundSkill ? foundSkill.name : '',
                    value: val.toString(),
                  };
                })}
                onChange={opts => field.onChange(opts.map(opt => +opt.value))}
                options={skillsOptions}
                placeholder="Оберіть навички"
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
                <FormLabel htmlFor="description">Опис проєкту</FormLabel>
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
              <FormItem className="w-full">
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
  );
};

export default CreateProjectPage;
