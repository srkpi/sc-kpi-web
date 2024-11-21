'use client';

import { FC, useState } from 'react';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

import EditCategoryModal from '@/components/admin/edit-category-modal';
import { Button } from '@/components/ui/button';
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
import { api } from '@/lib/api';
import { axiosFetcher } from '@/lib/swr/fetcher';
import { Category } from '@/types/category';
import { FAQType } from '@/types/faq';

const EditorComponent = dynamic(() => import('@/components/ui/editor'), {
  ssr: false,
});

interface EditDepartmentPageProps {
  params: {
    id: string;
  };
}

const EditFaqPage: FC<EditDepartmentPageProps> = ({ params }) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedFaq, setUpdatedFaq] = useState<Partial<FAQType>>({});

  const { data: categories } = useSWR<Category[]>(
    '/faq/categories',
    axiosFetcher,
    {
      revalidateOnFocus: false,
    },
  );
  const { data: faq } = useSWR<FAQType>(`/faq/${params.id}`, axiosFetcher, {
    revalidateOnFocus: false,
    onError: error => {
      toast({
        variant: 'destructive',
        title: 'Не вдалося отримати питання',
        description: error.message,
      });
    },
  });

  const handleChange = (field: keyof FAQType, value: string | number) => {
    setUpdatedFaq(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await api.patch('/faq', {
        id: faq?.id,
        ...updatedFaq,
      });

      toast({
        title: 'Питання успішно оновлено',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Сталася помилка при оновленні питання',
          description: error.message,
        });
      }
    }
  };

  const initialCategory = categories?.find(
    category => category.id === faq?.categoryId,
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-[57px]">
        <h1 className="text-h1 font-semibold">Редагування FAQ</h1>
      </div>
      <div className="flex items-end gap-6">
        <div className="flex flex-col gap-1">
          <Input
            id="question"
            placeholder="Питання"
            className="w-[1056px] border-x-0 border-t-0 rounded-none pl-0"
            defaultValue={faq?.question}
            onChange={e => handleChange('question', e.target.value)}
          />
        </div>
        <Select
          defaultValue={initialCategory?.id.toString()}
          onValueChange={value => handleChange('categoryId', parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={initialCategory?.name} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories?.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="default"
          className="w-[188px] h-[39px] "
          onClick={() => setIsModalOpen(true)}
        >
          Змінити категорії
        </Button>
      </div>
      <p className="mt-[57px] mb-[30px]">Відповідь</p>
      <div className="mt-3">
        <EditorComponent
          setText={text => handleChange('answer', text)}
          initialValue={faq?.answer}
        />
      </div>

      <Button
        variant="default"
        className="w-[165px] h-[50px] mt-[48px]"
        onClick={handleSave}
      >
        Зберегти зміни
      </Button>
      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategories={categories || []}
      />
    </div>
  );
};

export default EditFaqPage;
