import * as React from 'react';

import FaqContainer from '@/containers/faq-container';
import { api } from '@/lib/api';
import { Category } from '@/types/category';
import { FAQType } from '@/types/faq';

export default async function FAQ() {
  const { data: faqs } = await api.get<FAQType[]>('/faq');
  const { data: categories } = await api.get<Category[]>('/faq/categories');

  if (categories.length === 0 || faqs.length === 0) return null;

  return <FaqContainer faqs={faqs} categories={categories} />;
}
