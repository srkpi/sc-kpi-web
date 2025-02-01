import { Category } from '@/types/category';

export interface FAQ {
  name: string;
  id: number;
  question: string;
  answer: string;
  categoryId: number;
  category: Category;
}
