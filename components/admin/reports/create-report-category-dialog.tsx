import { createReportCategory } from '@/app/actions/report-categories.actions';
import ReportCategoryForm, {
  ReportCategoryFormData,
} from '@/components/admin/reports/report-category-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast/use-toast';
import { ReportCategory } from '@/types/report';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: ReportCategory[];
  onCreated?: (category: ReportCategory) => void;
}

export default function CreateReportCategoryDialog({
  open,
  onOpenChange,
  categories,
  onCreated,
}: Props) {
  const { toast } = useToast();

  const handleSubmit = async (data: ReportCategoryFormData) => {
    try {
      const category = await createReportCategory(data);
      toast({ title: 'Категорію успішно додано' });
      onCreated?.(category);
      onOpenChange(false);
    } catch {
      toast({ variant: 'destructive', title: 'Помилка додавання категорії' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark border-greyBlue">
        <DialogHeader>
          <DialogTitle className="text-h3">Нова категорія звітів</DialogTitle>
          <DialogDescription>
            З’явиться у фільтрі каталогу і в списку категорій під час створення
            звіту.
          </DialogDescription>
        </DialogHeader>
        <ReportCategoryForm
          takenNames={categories.map(category => category.name)}
          submitText="Створити категорію"
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
