import { FC, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import {
  addFaqCategory,
  deleteFAQCategory,
  updateFAQCategory,
} from '@/app/[locale]/actions/faq.actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';
import { Category } from '@/types/category';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategories: Category[];
}

const EditCategoryModal: FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  initialCategories,
}) => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );

  const { toast } = useToast();

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleInputChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newName = event.target.value;
    setCategories(
      categories.map(category =>
        category.id === id ? { ...category, name: newName } : category,
      ),
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFAQCategory(id);
      setCategories(categories.filter(category => category.id !== id));
      toast({
        title: 'Категорію успішно видалено',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Не вдалося видалити категорію',
      });
    }
  };

  const handleSave = async (id: number, name: string) => {
    try {
      await updateFAQCategory(id, name);
      toast({
        title: 'Категорію успішно оновлено',
      });
      setEditingCategoryId(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Не вдалося оновити категорію',
      });
    }
  };

  const handleAdd = async () => {
    try {
      const newCategory = await addFaqCategory(newCategoryName);
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setIsAdding(false);
      toast({ title: 'Категорію успішно додано' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Помилка додавання категорії' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-[102px] max-w-fit pt-16">
        <DialogHeader>
          <DialogTitle className="text-center text-h1">
            Редагувати категорії
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-7">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`flex items-center justify-between gap-[12px] ${
                index === categories.length - 1 ? 'mb-[41px]' : 'mb-0'
              }`}
            >
              {editingCategoryId === category.id ? (
                <Input
                  className="text-white min-h-[50px]"
                  value={category.name}
                  onChange={e => handleInputChange(category.id, e)}
                />
              ) : (
                <span className="text-white rounded-[10px] px-6 py-2 bg-blue text-center w-fit mr-[41px]">
                  {category.name}
                </span>
              )}
              <div className="flex gap-[24px]">
                {editingCategoryId === category.id ? (
                  <Button
                    className="w-[110px] h-[50px]"
                    variant="default"
                    onClick={() => handleSave(category.id, category.name)}
                  >
                    Зберегти
                  </Button>
                ) : (
                  <Button
                    className="w-[110px] h-[50px] bg-inherit"
                    variant="default"
                    onClick={() => setEditingCategoryId(category.id)}
                  >
                    Редагувати
                  </Button>
                )}
                <Button
                  className="w-[110px] h-[50px]"
                  variant="destructive"
                  onClick={() => handleDelete(category.id)}
                >
                  Видалити
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="default"
            className="bg-amber-50 text-blue rounded-[18px] h-[44px] w-fit hover:bg-whit"
            onClick={() => setIsAdding(true)}
          >
            <Plus size={26} />
          </Button>
          {isAdding && (
            <div className="flex items-center justify-between mt-[30px] mb-16">
              <Input
                placeholder="Назва категорії"
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
                className="border-0 border-b rounded-none w-[425px]"
              />
              <Button
                variant="default"
                className="w-[110px] h-[50px] bg-inherit"
                onClick={handleAdd}
              >
                Зберегти
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
