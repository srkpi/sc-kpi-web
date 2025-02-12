import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import * as z from 'zod';

import { updateProject } from '@/app/actions/department.actions';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DepartmentProject } from '@/types/departments';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '../ui/dialog';
import { useToast } from '../ui/toast/use-toast';

interface EditProjectModalProps {
  project: DepartmentProject;
}

const EditProjectModal: FC<EditProjectModalProps> = ({ project }) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const FormSchema = z.object({
    name: z.string().min(1, { message: 'Поле обов`язкове' }),
    description: z.string().min(1, { message: 'Поле обов`язкове' }),
  });

  type FormData = z.infer<typeof FormSchema>;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateProject(project.id, data, file);

      toast({
        title: 'Проєкт успішно змінений',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося змінити проєкт',
          description: error.message,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[110px] h-[35px]">Змінити</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1300px] bg-dark border-0 justify-center items-center">
        <Form {...form}>
          <form
            className="flex flex-col gap-8"
            onSubmit={form.handleSubmit(handleFormSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Назва проєкту</FormLabel>
                  <Input
                    {...field}
                    name="name"
                    className="p-3 w-[516px] h-[46px] border-0 border-b rounded-none"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Опис проєкту</FormLabel>
                  <Textarea {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <ImageUpload onFileUpload={setFile} />
            <DialogFooter>
              <Button
                className="w-[141px] h-[51px]"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                Зберегти зміни
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;
