import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import ReportCategoryTag from '@/components/reports/report-category-tag';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/cn';
import { ReportCategoryColor, reportCategoryColors } from '@/types/report';

const NAME_MAX_LENGTH = 20;
const colors = Object.keys(reportCategoryColors) as [
  ReportCategoryColor,
  ...ReportCategoryColor[],
];

const createFormSchema = (takenNames: string[]) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Назва обов’язкова' })
      .max(NAME_MAX_LENGTH, { message: 'Назва задовга' })
      .refine(name => !takenNames.includes(name), {
        message: 'Категорія з такою назвою вже існує',
      }),
    color: z.enum(colors, { error: 'Оберіть колір' }),
  });

export type ReportCategoryFormData = z.infer<
  ReturnType<typeof createFormSchema>
>;

interface Props {
  initialValues?: ReportCategoryFormData;
  takenNames: string[];
  submitText: string;
  onSubmit: (data: ReportCategoryFormData) => Promise<void>;
  onCancel: () => void;
}

export default function ReportCategoryForm({
  initialValues,
  takenNames,
  submitText,
  onSubmit,
  onCancel,
}: Props) {
  const form = useForm<ReportCategoryFormData>({
    resolver: zodResolver(createFormSchema(takenNames)),
    defaultValues: initialValues ?? { name: '' },
  });

  const name = useWatch({ control: form.control, name: 'name' });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва категорії</FormLabel>
              <FormControl>
                <Input {...field} maxLength={NAME_MAX_LENGTH} />
              </FormControl>
              <p className="text-m-p text-muted-foreground text-right">
                {name.length} / {NAME_MAX_LENGTH}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Колір тегу</FormLabel>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => field.onChange(color)}
                    className={cn(
                      'rounded-[10px] p-1 border-2 border-transparent',
                      field.value === color && 'border-blue',
                    )}
                  >
                    <ReportCategoryTag
                      category={{ name: name.trim() || 'Тег', color }}
                    />
                  </button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" type="button" onClick={onCancel}>
            Скасувати
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
