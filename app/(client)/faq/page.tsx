import * as React from 'react';

import FaqContainer from '@/containers/faq-container';
import { api } from '@/lib/api';
import { Category } from '@/types/category';
import { FAQ } from '@/types/faq';

export default async function Page() {
  const { data: faqs } = await api.get<FAQ[]>('/faq');
  const { data: categories } = await api.get<Category[]>('/faq/categories');

  if (!faqs || !categories || categories.length === 0 || faqs.length === 0)
    return null;

  return <FaqContainer faqs={faqs} categories={categories} />;
}
