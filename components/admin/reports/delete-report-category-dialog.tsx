import { useState } from 'react';

import { deleteReportCategory } from '@/app/actions/report-categories.actions';
import ConfirmDialog from '@/components/admin/confirm-dialog';
import ReportCategoryTag from '@/components/reports/report-category-tag';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/toast/use-toast';
import { pluralize } from '@/lib/helpers';
import { ReportCategory } from '@/types/report';

interface Props {
  category: ReportCategory | null;
  categories: ReportCategory[];
  onClose: () => void;
}

export default function DeleteReportCategoryDialog({
  category,
  categories,
  onClose,
}: Props) {
  const [moveTo, setMoveTo] = useState<string>();
  const { toast } = useToast();

  const reportsCount = category?.reportsCount ?? 0;

  const handleDelete = async () => {
    if (!category) return;
    try {
      await deleteReportCategory(category.id, moveTo ? +moveTo : undefined);
      toast({ title: 'Категорію успішно видалено' });
    } catch {
      toast({ variant: 'destructive', title: 'Не вдалося видалити категорію' });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setMoveTo(undefined);
    onClose();
  };

  return (
    <ConfirmDialog
      open={Boolean(category)}
      onOpenChange={handleOpenChange}
      title={`Видалити категорію «${category?.name}»?`}
      description={
        reportsCount > 0
          ? `До цієї категорії прив'язано ${pluralize(reportsCount, ['звіт', 'звіти', 'звітів'])}. Щоб видалити її, оберіть, куди їх перенести.`
          : 'Категорія не містить звітів, її можна безпечно видалити.'
      }
      confirmText={reportsCount > 0 ? 'Перенести й видалити' : 'Видалити'}
      disabled={reportsCount > 0 && !moveTo}
      onConfirm={handleDelete}
    >
      {reportsCount > 0 && (
        <Select value={moveTo} onValueChange={setMoveTo}>
          <SelectTrigger>
            <SelectValue placeholder="Перенести звіти в категорію" />
          </SelectTrigger>
          <SelectContent>
            {categories
              .filter(item => item.id !== category?.id)
              .map(item => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  <ReportCategoryTag category={item} />
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </ConfirmDialog>
  );
}
