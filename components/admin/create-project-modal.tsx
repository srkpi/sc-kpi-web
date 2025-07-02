import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Plus } from 'lucide-react';
import * as z from 'zod';

import { createClubProject } from '@/app/[locale]/actions/club.actions';
import { createDepartmentProject } from '@/app/[locale]/actions/department.actions';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useToast } from '../ui/toast/use-toast';

interface CreateProjectModalProps {
  id: number;
  variant: 'department' | 'club';
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({ id, variant }) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const FormSchema = z.object({
    name: z.string().min(1, { message: 'Поле обов`язкове' }),
    description: z.string().min(1, { message: 'Поле обов`язкове' }),
  });

  type FormData = z.infer<typeof FormSchema>;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
    }

    const updatedJsonData = {
      ...data,
      ...(variant === 'department'
        ? { departmentId: Number(id) }
        : { clubId: Number(id) }),
    };

    formData.append('json', JSON.stringify(updatedJsonData));

    try {
      if (variant === 'department') {
        await createDepartmentProject(formData);
      } else {
        await createClubProject(formData);
      }
      toast({
        title: 'Проєкт успішно створений',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося додати проєкт',
          description: error.message,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mb-[20px]">
          <Plus color="#374FFA" size={26}></Plus>
          Додати проєкт
        </Button>
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
                Додати
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
