import { useState } from 'react';

import { createCategory } from '@/app/actions/categories.actions';
import { Button } from '@/components/ui/button';

const CategoryCreate = () => {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCategory(event.target.value);

  const handleAddCategory = async () => {
    if (!category) return;

    await createCategory(category);
    setCategory('');
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <input
        className="text-xl flex-1 p-3 rounded-xl bg-transparent border border-blue disabled:border-greyBlue disabled:opacity-75 transition duration-500"
        value={category}
        onChange={handleCategoryChange}
        placeholder="Введіть назву категорії"
      />
      <div className="flex gap-2">
        <Button variant="default" className="w-36" onClick={handleAddCategory}>
          Додати
        </Button>
      </div>
    </div>
  );
};

export default CategoryCreate;
