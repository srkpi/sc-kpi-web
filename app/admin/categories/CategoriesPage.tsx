'use client';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

import { deleteClub } from '@/app/actions/club.actions';
import CategoryItem from '@/components/admin/categories/CategoryItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/toast/use-toast';
import CategoryCreate from '@/components/admin/categories/CategoryCreate';

interface Props {
  categories: string[];
}

export default function CategoriesPage({ categories }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteClub(id);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Стался помилка при видаленні студ. об'єднання`,
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <h1 className="text-h1 font-semibold mb-8">Категорії</h1>
      <Input
        className="w-full text-p pl-16 mb-4"
        placeholder="Пошук..."
        value={searchQuery}
        onChange={handleSearchChange}
        icon={<Search />}
        iconPosition="start"
      />

      <div className="flex flex-col w-full gap-2">
        {filteredCategories.map(category => (
          <CategoryItem category={category} key={category} />
        ))}
      </div>

      <div className="w-[90%] mx-auto my-5 rounded-full border-t border-greyBlue"></div>

      <CategoryCreate />
    </>
  );
}
