'use client';

import { useState } from 'react';
import { Eye, Layers, Pencil, Trash2, Upload } from 'lucide-react';

import { deleteReport, updateReport } from '@/app/actions/reports.actions';
import ConfirmDialog from '@/components/admin/confirm-dialog';
import PdfFilePicker from '@/components/admin/reports/pdf-file-picker';
import ReportCategoriesDialog from '@/components/admin/reports/report-categories-dialog';
import ReportFormDialog from '@/components/admin/reports/report-form-dialog';
import ReportCategoryTag from '@/components/reports/report-category-tag';
import ReportsFilters from '@/components/reports/reports-filters';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/toast/use-toast';
import { cn } from '@/lib/cn';
import { formatDate, formatFileSize } from '@/lib/helpers';
import { Report, ReportCategory } from '@/types/report';

interface Props {
  reports: Report[];
  categories: ReportCategory[];
}

export default function ReportsPage({ reports, categories }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<Report>();
  const [deletingReport, setDeletingReport] = useState<Report | null>(null);

  const { toast } = useToast();

  const filteredReports = reports.filter(
    report =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategoryId || report.category.id === selectedCategoryId),
  );

  const openForm = (report?: Report) => {
    setEditingReport(report);
    setIsFormOpen(true);
  };

  const handleFileReplace = async (id: number, file: File) => {
    const formData = new FormData();
    formData.append('json', JSON.stringify({ id }));
    formData.append('file', file);

    try {
      await updateReport(formData);
      toast({ title: 'Файл звіту успішно замінено' });
    } catch {
      toast({ variant: 'destructive', title: 'Не вдалося замінити файл' });
    }
  };

  const handleDelete = async () => {
    if (!deletingReport) return;
    try {
      await deleteReport(deletingReport.id);
      toast({ title: 'Звіт успішно видалено' });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Сталася помилка при видаленні звіту',
      });
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-h1 font-semibold">Звітність</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setIsCategoriesOpen(true)}
          >
            <Layers size={20} />
            Категорії
          </Button>
          <Button size="sm" className="gap-2" onClick={() => openForm()}>
            <Upload size={20} />
            Завантажити звіт
          </Button>
        </div>
      </div>

      <ReportsFilters
        search={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        categoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
      />

      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Звіт</TableHead>
            <TableHead>Категорія</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Файл</TableHead>
            <TableHead className="text-right">Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReports.map(report => (
            <TableRow key={report.id}>
              <TableCell className="font-semibold">{report.title}</TableCell>
              <TableCell>
                <ReportCategoryTag category={report.category} />
              </TableCell>
              <TableCell>{formatDate(report.publishedAt)}</TableCell>
              <TableCell className="whitespace-nowrap">
                PDF · {formatFileSize(report.fileSize)}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/${report.id}/file`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Переглянути"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'sm' }),
                      'p-2',
                    )}
                  >
                    <Eye size={16} />
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-2"
                    aria-label="Редагувати"
                    onClick={() => openForm(report)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <PdfFilePicker
                    onFileSelect={file => handleFileReplace(report.id, file)}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'sm' }),
                      'p-2',
                    )}
                  >
                    <Upload size={16} aria-label="Замінити файл" />
                  </PdfFilePicker>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="p-2"
                    aria-label="Видалити"
                    onClick={() => setDeletingReport(report)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredReports.length === 0 && (
        <p className="text-center text-muted-foreground my-8">
          Звітів не знайдено
        </p>
      )}

      <ReportFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        categories={categories}
        report={editingReport}
      />
      <ReportCategoriesDialog
        open={isCategoriesOpen}
        onOpenChange={setIsCategoriesOpen}
        categories={categories}
      />
      <ConfirmDialog
        open={Boolean(deletingReport)}
        onOpenChange={open => !open && setDeletingReport(null)}
        title={`Видалити звіт «${deletingReport?.title}»?`}
        description="Звіт і його PDF-файл буде видалено без можливості відновлення."
        confirmText="Видалити"
        onConfirm={handleDelete}
      />
    </>
  );
}
