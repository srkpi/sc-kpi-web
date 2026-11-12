import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Plus, Trash2, Upload } from 'lucide-react';
import * as z from 'zod';

import { createReport, updateReport } from '@/app/actions/reports.actions';
import CreateReportCategoryDialog from '@/components/admin/reports/create-report-category-dialog';
import PdfFilePicker from '@/components/admin/reports/pdf-file-picker';
import ReportCategoryTag from '@/components/reports/report-category-tag';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/toast/use-toast';
import { cn } from '@/lib/cn';
import { formatFileSize } from '@/lib/helpers';
import { Report, ReportCategory } from '@/types/report';

const NEW_CATEGORY = 'new';

const FormSchema = z.object({
  title: z.string().trim().min(1, { message: 'Назва обов’язкова' }),
  categoryId: z.number({ error: 'Оберіть категорію' }),
  publishedAt: z.string().min(1, { message: 'Дата обов’язкова' }),
});

type FormData = z.infer<typeof FormSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: ReportCategory[];
  report?: Report;
}

export default function ReportFormDialog({
  open,
  onOpenChange,
  categories,
  report,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    values: {
      title: report?.title ?? '',
      categoryId: report?.category.id as number,
      // sv-SE formats a local date as YYYY-MM-DD, as date inputs expect
      publishedAt:
        report?.publishedAt.slice(0, 10) ??
        new Date().toLocaleDateString('sv-SE'),
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFile(null);
      form.reset();
    }
    onOpenChange(isOpen);
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    if (!form.getValues('title')) {
      form.setValue('title', selectedFile.name.replace(/\.pdf$/i, ''));
    }
  };

  const handleFormSubmit = async (data: FormData) => {
    if (!report && !file) {
      toast({ variant: 'destructive', title: 'Завантажте PDF-файл' });
      return;
    }

    const formData = new FormData();
    formData.append(
      'json',
      JSON.stringify(report ? { id: report.id, ...data } : data),
    );
    if (file) {
      formData.append('file', file);
    }

    try {
      if (report) {
        await updateReport(formData);
      } else {
        await createReport(formData);
      }
      toast({ title: 'Звіт успішно збережено' });
      handleOpenChange(false);
    } catch {
      toast({ variant: 'destructive', title: 'Не вдалося зберегти звіт' });
    }
  };

  const fileInfo = file
    ? { name: file.name, size: file.size }
    : report && { name: report.fileName, size: report.fileSize };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-dark border-greyBlue max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="text-h3">
            {report ? 'Редагування звіту' : 'Новий звіт'}
          </DialogTitle>
          <DialogDescription>
            Завантажте PDF і заповніть картку – так звіт з’явиться в каталозі.
          </DialogDescription>
        </DialogHeader>

        {fileInfo ? (
          <div className="flex items-center gap-4 p-4 border border-greyBlue/40 rounded-[10px]">
            <FileText className="shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="truncate">{fileInfo.name}</p>
              <p className="text-l-p text-muted-foreground">
                PDF · {formatFileSize(fileInfo.size)}
              </p>
            </div>
            <PdfFilePicker
              onFileSelect={handleFileSelect}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'p-2',
              )}
            >
              <Upload size={16} aria-label="Замінити файл" />
            </PdfFilePicker>
            {file && (
              <Button
                variant="destructive"
                size="sm"
                className="p-2"
                aria-label="Прибрати файл"
                onClick={() => setFile(null)}
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        ) : (
          <PdfFilePicker
            onFileSelect={handleFileSelect}
            className="flex flex-col items-center gap-2 p-8 border-2 border-dashed border-greyBlue rounded-[10px] text-center"
          >
            <Upload />
            <span>Перетягніть PDF сюди або оберіть файл</span>
            <span className="text-l-p text-muted-foreground">
              Лише PDF, до 20MB
            </span>
          </PdfFilePicker>
        )}

        <Form {...form}>
          <form className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва звіту</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категорія</FormLabel>
                    <Select
                      value={field.value?.toString() ?? ''}
                      onValueChange={value =>
                        value === NEW_CATEGORY
                          ? setIsCreatingCategory(true)
                          : field.onChange(+value)
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="h-[50px] md:h-[62px]">
                          <SelectValue placeholder="Оберіть категорію" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            <ReportCategoryTag category={category} />
                          </SelectItem>
                        ))}
                        <SelectSeparator />
                        <SelectItem value={NEW_CATEGORY}>
                          <span className="flex items-center gap-2">
                            <Plus size={16} />
                            Додати категорію
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата публікації</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="[color-scheme:dark]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <DialogFooter className="sm:justify-end">
          <Button
            size="sm"
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(handleFormSubmit)}
          >
            {report ? 'Зберегти' : 'Опублікувати'}
          </Button>
        </DialogFooter>

        <CreateReportCategoryDialog
          open={isCreatingCategory}
          onOpenChange={setIsCreatingCategory}
          categories={categories}
          onCreated={category => form.setValue('categoryId', category.id)}
        />
      </DialogContent>
    </Dialog>
  );
}
