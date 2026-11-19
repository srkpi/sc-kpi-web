'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import { createManager, updateManager } from '@/app/actions/manager.actions';
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
import { Manager } from '@/types/manager';

const requiredText = (max: number) =>
  z
    .string()
    .trim()
    .min(1, { message: 'Поле обов’язкове' })
    .max(max, { message: `Максимум ${max} символів` });

const FormSchema = z.object({
  lastName: requiredText(STRUCTURE_LIMITS.personName),
  firstName: requiredText(STRUCTURE_LIMITS.personName),
  middleName: z
    .string()
    .trim()
    .max(STRUCTURE_LIMITS.personName, {
      message: `Максимум ${STRUCTURE_LIMITS.personName} символів`,
    }),
  position: requiredText(STRUCTURE_LIMITS.position),
  duties: requiredText(STRUCTURE_LIMITS.managerDuties),
});

type FormValues = z.infer<typeof FormSchema>;

const NAME_FIELDS = [
  { name: 'lastName', label: 'Прізвище' },
  { name: 'firstName', label: 'Ім’я' },
  { name: 'middleName', label: 'По батькові (необов’язково)' },
] as const;

interface ManagerFormProps {
  manager?: Manager;
}

const ManagerForm: FC<ManagerFormProps> = ({ manager }) => {
  const isEdit = Boolean(manager);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lastName: manager?.lastName ?? '',
      firstName: manager?.firstName ?? '',
      middleName: manager?.middleName ?? '',
      position: manager?.position ?? '',
      duties: manager?.duties ?? '',
    },
  });

  const dutiesLength = form.watch('duties').length;

  const handleFormSubmit = async (data: FormValues) => {
    const { middleName, ...rest } = data;
    const payload = { ...rest, ...(middleName ? { middleName } : {}) };

    try {
      if (manager) {
        await updateManager(manager.id, payload, file);
        toast({ title: 'Менеджера успішно оновлено' });
        router.refresh();
        return;
      }

      if (!file) {
        toast({ variant: 'destructive', title: 'Додайте фото менеджера' });
        return;
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('json', JSON.stringify(payload));

      await createManager(formData);
      toast({ title: 'Менеджера успішно додано' });
      router.push('/admin/managers');
    } catch {
      toast({
        variant: 'destructive',
        title: isEdit
          ? 'Не вдалося оновити менеджера'
          : 'Не вдалося додати менеджера',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-h1 font-semibold">
            {isEdit ? 'Редагування' : 'Додавання'}
          </h1>
          <Button
            className="w-[120px] h-[55px]"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {isEdit ? 'Зберегти' : 'Додати'}
          </Button>
        </div>

        <ImageUpload
          photoSrc={manager?.image || undefined}
          onFileUpload={setFile}
        />

        <div className="flex gap-[24px] items-start">
          {NAME_FIELDS.map(item => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={item.name}>{item.label}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="position">Посада</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duties"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="duties">Обов’язки</FormLabel>
              <FormControl>
                <Textarea className="h-[160px]" {...field} />
              </FormControl>
              <p
                className={
                  dutiesLength > STRUCTURE_LIMITS.managerDuties
                    ? 'text-sm text-red-500'
                    : 'text-sm text-greyBlue'
                }
              >
                {dutiesLength}/{STRUCTURE_LIMITS.managerDuties}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ManagerForm;
