import { type FC, MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { z } from 'zod';

import {
  deleteCategory,
  updateCategory,
} from '@/app/actions/categories.actions';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast/use-toast';

interface CategoryItemProps {
  id: number;
  name: string;
}

const CategoryItem: FC<CategoryItemProps> = ({ id, name }) => {
  const [isEditing, setIsEditing] = useState(false);

  const FormSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Категорія повинна містити принаймні 1 символ' }),
  });

  type FormData = z.infer<typeof FormSchema>;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { name },
  });

  async function handleFormSubmit(data: FormData) {
    try {
      if (data.name !== name) await updateCategory(id, data.name);
      setIsEditing(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося змінити категорію',
          description: error.message,
        });
      }
    }
  }

  const handleDiscardChanges = (event: MouseEvent) => {
    event.preventDefault();
    form.setValue('name', name);
    setIsEditing(false);
  };

  const handleEditing = (event: MouseEvent) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleDeleteCategory = (event: MouseEvent) => {
    event.preventDefault();
    deleteCategory(id);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex items-center justify-between gap-4"
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Input
                {...field}
                name="name"
                className="text-xl w-full p-3 rounded-xl bg-transparent border border-blue disabled:border-greyBlue disabled:opacity-75 transition duration-500"
                disabled={!isEditing}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="default" className="w-36" type="submit">
                Зберегти
              </Button>
              <Button
                variant="destructive"
                className="w-36"
                onClick={handleDiscardChanges}
                type="button"
              >
                Скасувати
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-36"
                onClick={handleEditing}
                type="button"
              >
                Змінити
              </Button>
              <Button
                variant="destructive"
                className="w-36"
                onClick={handleDeleteCategory}
                type="button"
              >
                Видалити
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CategoryItem;
