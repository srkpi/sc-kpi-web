'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import {
  createDepartment,
  updateDepartmentHeadImage,
} from '@/app/actions/department.actions';
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
import { STRUCTURE_LIMITS } from '@/constants/structure-limits';
import { requiredText } from '@/lib/required-text';

const EditorComponent = dynamic(() => import('@/components/ui/editor'), {
  ssr: false,
});

const FormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Назва обов’язкова' }),
  shortDescription: z.string().min(1, { message: 'Стислий опис обов’язковий' }),
  description: z.string().min(1, { message: 'Опис обов’язковий' }),
  gains: z.string(),
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

const CreateDepartmentPage: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [headFile, setHeadFile] = useState<File | null>(null);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
      gains: '',
      headLastName: '',
      headFirstName: '',
      headMiddleName: '',
      buttonLink: '',
    },
  });

  const handleFormSubmit = async (data: FormValues) => {
    const { headMiddleName, ...rest } = data;
    const payload = {
      ...rest,
      ...(headMiddleName ? { headMiddleName } : {}),
    };

    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }
    formData.append('json', JSON.stringify(payload));

    try {
      const created = await createDepartment(formData);

      if (headFile) {
        await updateDepartmentHeadImage(created.id, headFile);
      }

      toast({
        title: 'Департамент успішно додано',
      });
      router.push('/admin/departments');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Сталася помилка при створенні департаменту',
      });
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
              disabled={form.formState.isSubmitting}
            >
              Додати
            </Button>
          </div>
          <div className="flex items-start gap-[24px] font-medium">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-6 grid w-full">
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
          <div className="flex flex-wrap gap-[48px]">
            <div className="flex flex-col gap-3">
              <p className="text-p font-semibold">Зображення департаменту</p>
              <ImageUpload onFileUpload={setFile} />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-p font-semibold">Фото голови департаменту</p>
              <ImageUpload onFileUpload={setHeadFile} />
            </div>
          </div>
          <div className="flex gap-[24px] items-start mt-6">
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
        </div>
      </form>
    </Form>
  );
};

export default CreateDepartmentPage;
