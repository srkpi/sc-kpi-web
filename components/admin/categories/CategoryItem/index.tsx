import { type FC, useState } from 'react';
import { z, ZodError } from 'zod';

import {
  deleteCategory,
  updateCategory,
} from '@/app/actions/categories.actions';
import { Button } from '@/components/ui/button';

type CategoryItemProps = {
  category: string;
};

const CategoryItem: FC<CategoryItemProps> = ({ category: initialCategory }) => {
  const [status, setStatus] = useState<'read' | 'write'>('read');
  const [error, setError] = useState('');
  const [category, setCategory] = useState(initialCategory);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    setError('');
  };

  const ErrorMessage = () => (
    <div className="text-red-500 w-fit mx-auto">{error}</div>
  );

  const categorySchema = z
    .string()
    .trim()
    .min(1, { message: 'Категорія повинна містити принаймні 1 символ' });

  function editCategory() {
    setStatus('write');
  }

  function saveChanges() {
    try {
      categorySchema.parse(category);
      updateCategory(initialCategory, category);
      setStatus('read');
    } catch (e) {
      if (e instanceof ZodError) {
        console.error(e.errors[0].message);
        setError(e.errors[0].message);
      } else {
        console.error(e);
      }
    }
  }

  function discardChanges() {
    setCategory(initialCategory);
    setStatus('read');
  }

  function removeCategory() {
    deleteCategory(category);
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <input
          className="text-xl w-full p-3 rounded-xl bg-transparent border border-blue disabled:border-greyBlue disabled:opacity-75 transition duration-500"
          style={{ borderColor: error ? '#FF0000' : '' }}
          value={category}
          onChange={handleCategoryChange}
          disabled={status === 'read'}
        />
        <ErrorMessage />
      </div>

      <div className="flex gap-2">
        {status === 'read' ? (
          <>
            <Button
              variant="outline"
              className="w-36"
              onClick={() => editCategory()}
            >
              Змінити
            </Button>
            <Button
              variant="destructive"
              className="w-36"
              onClick={() => removeCategory()}
            >
              Видалити
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="default"
              className="w-36"
              onClick={() => saveChanges()}
            >
              Зберегти
            </Button>
            <Button
              variant="destructive"
              className="w-36"
              onClick={() => discardChanges()}
            >
              Скасувати
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
