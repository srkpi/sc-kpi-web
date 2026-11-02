import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { updateReportCategory } from '@/app/actions/report-categories.actions';
import CreateReportCategoryDialog from '@/components/admin/reports/create-report-category-dialog';
import DeleteReportCategoryDialog from '@/components/admin/reports/delete-report-category-dialog';
import ReportCategoryForm, {
  ReportCategoryFormData,
} from '@/components/admin/reports/report-category-form';
import ReportCategoryTag from '@/components/reports/report-category-tag';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast/use-toast';
import { pluralize } from '@/lib/helpers';
import { MAX_REPORT_CATEGORIES, ReportCategory } from '@/types/report';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: ReportCategory[];
}

export default function ReportCategoriesDialog({
  open,
  onOpenChange,
  categories,
}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingCategory, setDeletingCategory] =
    useState<ReportCategory | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { toast } = useToast();

  const handleUpdate = async (id: number, data: ReportCategoryFormData) => {
    try {
      await updateReportCategory(id, data);
      toast({ title: 'Категорію успішно оновлено' });
      setEditingId(null);
    } catch {
      toast({ variant: 'destructive', title: 'Не вдалося оновити категорію' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark border-greyBlue max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="text-h3">Категорії звітів</DialogTitle>
          <DialogDescription>
            Категорія показується тегом на картці звіту і у фільтрі каталогу.
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-col divide-y divide-greyBlue/40 border border-greyBlue/40 rounded-[10px]">
          {categories.map(category => (
            <li key={category.id} className="p-4">
              {editingId === category.id ? (
                <ReportCategoryForm
                  initialValues={category}
                  takenNames={categories
                    .filter(item => item.id !== category.id)
                    .map(item => item.name)}
                  submitText="Зберегти"
                  onSubmit={data => handleUpdate(category.id, data)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <ReportCategoryTag category={category} />
                  <div className="flex items-center gap-2">
                    <span className="text-l-p text-muted-foreground mr-2">
                      {pluralize(category.reportsCount ?? 0, [
                        'звіт',
                        'звіти',
                        'звітів',
                      ])}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2"
                      aria-label="Редагувати"
                      onClick={() => setEditingId(category.id)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="p-2"
                      aria-label="Видалити"
                      onClick={() => setDeletingCategory(category)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={categories.length >= MAX_REPORT_CATEGORIES}
            onClick={() => setIsCreating(true)}
          >
            <Plus size={18} />
            Додати категорію
          </Button>
          <span className="text-l-p text-muted-foreground">
            {categories.length} з {MAX_REPORT_CATEGORIES} категорій
          </span>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button size="sm">Готово</Button>
          </DialogClose>
        </DialogFooter>

        <CreateReportCategoryDialog
          open={isCreating}
          onOpenChange={setIsCreating}
          categories={categories}
        />
        <DeleteReportCategoryDialog
          category={deletingCategory}
          categories={categories}
          onClose={() => setDeletingCategory(null)}
        />
      </DialogContent>
    </Dialog>
  );
}
