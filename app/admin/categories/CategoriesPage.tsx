'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

import CategoryCreate from '@/components/admin/categories/CategoryCreate';
import CategoryItem from '@/components/admin/categories/CategoryItem';
import { Input } from '@/components/ui/input';
import { Category } from '@/types/category';

interface Props {
  categories: Category[];
}

export default function CategoriesPage({ categories }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
          <CategoryItem
            id={category.id}
            name={category.name}
            key={category.id}
          />
        ))}
      </div>

      <div className="w-[90%] mx-auto my-5 rounded-full border-t border-greyBlue"></div>

      <CategoryCreate />
    </>
  );
}
