'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import {
  createDepartmentSection,
  updateDepartmentSection,
} from '@/app/actions/department.actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { DepartmentSection } from '@/types/structure-department';

const FormSchema = z.object({
  name: requiredText(STRUCTURE_LIMITS.sectionName),
  description: requiredText(STRUCTURE_LIMITS.sectionDescription),
});

type FormValues = z.infer<typeof FormSchema>;

interface SectionModalProps {
  departmentId: number;
  // Якщо передано, модалка редагує відділ, інакше створює новий
  section?: DepartmentSection;
}

const SectionModal: FC<SectionModalProps> = ({ departmentId, section }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: section?.name ?? '',
      description: section?.description ?? '',
    },
  });

  const descriptionLength = form.watch('description').length;

  const handleFormSubmit = async (data: FormValues) => {
    try {
      if (section) {
        await updateDepartmentSection(section.id, data);
        toast({ title: 'Відділ успішно оновлено' });
      } else {
        await createDepartmentSection({ departmentId, ...data });
        toast({ title: 'Відділ успішно додано' });
        form.reset();
      }
      setOpen(false);
      router.refresh();
    } catch {
      toast({
        variant: 'destructive',
        title: section
          ? 'Не вдалося оновити відділ'
          : 'Не вдалося додати відділ',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {section ? (
          <Button className="w-[110px] h-[35px]">Змінити</Button>
        ) : (
          <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mt-[24px] mb-[20px]">
            <Plus color="#374FFA" size={26}></Plus>
            Додати відділ
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[800px] bg-dark border-0">
        <DialogHeader>
          <DialogTitle className="text-h2 font-semibold">
            {section ? 'Редагування відділу' : 'Новий відділ'}
          </DialogTitle>
        </DialogHeader>
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
                  <FormLabel htmlFor="name">Назва відділу</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Опис відділу</FormLabel>
                  <FormControl>
                    <Textarea className="h-[140px]" {...field} />
                  </FormControl>
                  <p
                    className={
                      descriptionLength > STRUCTURE_LIMITS.sectionDescription
                        ? 'text-sm text-red-500'
                        : 'text-sm text-greyBlue'
                    }
                  >
                    {descriptionLength}/{STRUCTURE_LIMITS.sectionDescription}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                className="w-[141px] h-[51px]"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {section ? 'Зберегти зміни' : 'Додати'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SectionModal;
