import { Category } from '@/types/category';

export type FAQType = {
  name: string;
  id: number;
  question: string;
  answer: string;
  categoryId: number;
  category: Category;
};
