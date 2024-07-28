import { Category } from '@/types/category';

export type FAQType = {
  id: number;
  question: string;
  answer: string;
  categoryId: number;
  category: Category;
};
