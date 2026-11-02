export type ReportCategoryColor = 'blue' | 'red' | 'yellow' | 'green';

export type ReportCategory = {
  id: number;
  name: string;
  color: ReportCategoryColor;
  reportsCount?: number;
};

export interface Report {
  id: number;
  title: string;
  publishedAt: string;
  category: ReportCategory;
  fileName: string;
  fileSize: number;
}

export const MAX_REPORT_CATEGORIES = 8;

export const reportCategoryColors: Record<ReportCategoryColor, string> = {
  blue: '#969CDC',
  red: '#D78292',
  yellow: '#E3A374',
  green: '#90CC99',
};
