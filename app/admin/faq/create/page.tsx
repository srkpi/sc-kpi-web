'use client';

import { FC, useState } from 'react';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

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

const CreateFaqPage: FC = () => {
  const [newFaq, setNewFaq] = useState<Partial<FAQType>>();

  const { data: categories } = useSWR<Category[]>(
    '/faq/categories',
    axiosFetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const { toast } = useToast();

  const handleChange = (field: keyof FAQType, value: string | number) => {
    setNewFaq(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!newFaq?.categoryId || !newFaq?.question || !newFaq?.answer) {
      toast({
        variant: 'destructive',
        title: 'Не всі поля заповнені',
      });
      return;
    }
    try {
      await api.post('/faq', newFaq);

      toast({
        title: 'Питання успішно додано',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: 'Сталася помилка при додаванні питання',
          description: error.message,
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-[57px]">
        <h1 className="text-h1 font-semibold">Додавання FAQ</h1>
      </div>
      <div className="flex items-end gap-6">
        <div className="flex flex-col gap-1">
          <Input
            id="question"
            placeholder="Питання"
            className="w-[1056px] border-x-0 border-t-0 rounded-none pl-0"
            onChange={e => handleChange('question', e.target.value)}
          />
        </div>
        <Select
          onValueChange={value => handleChange('categoryId', parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Категорія" />
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
      </div>
      <p className="mt-[57px] mb-[30px]">Відповідь</p>
      <div className="mt-3">
        <EditorComponent setText={text => handleChange('answer', text)} />
      </div>
      <Button
        variant="default"
        className="w-[165px] h-[50px] mt-[48px]"
        onClick={handleSave}
      >
        Додати
      </Button>
    </div>
  );
};

export default CreateFaqPage;
