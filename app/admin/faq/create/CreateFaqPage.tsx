'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';

import { createFAQ } from '@/app/actions/faq.actions';
import { FormDataType, FormSchema } from '@/app/admin/faq/validation';
import EditCategoryModal from '@/components/admin/edit-category-modal';
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/toast/use-toast';
import { Category } from '@/types/category';

const EditorComponent = dynamic(() => import('@/components/ui/editor'), {
  ssr: false,
});

interface Props {
  categories: Category[];
}

export function CreateFaqPage({ categories }: Props) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: '',
      categoryId: '',
      answer: '',
    },
  });

  const handleFormSubmit = async (data: FormDataType) => {
    try {
      await createFAQ(data);
      toast({
        title: 'Питання успішно додано',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Сталася помилка при додаванні питання',
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
          <h1 className="text-h1 font-semibold">Додавання FAQ</h1>
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Питання"
                      className="w-[1056px] border-x-0 border-t-0 rounded-none pl-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
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
                      <SelectGroup>
                        {categories?.map(category => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="default"
              type="button"
              className="w-[188px] h-[39px] "
              onClick={() => setIsModalOpen(true)}
            >
              Змінити категорії
            </Button>
          </div>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Відповідь</FormLabel>
                <EditorComponent
                  setText={text => form.setValue('answer', text)}
                  initialValue={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-[165px] h-[50px]" type="submit">
            Додати
          </Button>
        </form>
      </Form>
      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategories={categories || []}
      />
    </>
  );
}
