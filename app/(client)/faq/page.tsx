import * as React from 'react';

import FaqContainer from '@/containers/faq-container';
import { api } from '@/lib/api';
import { Category } from '@/types/category';
import { FAQType } from '@/types/faq';

export default async function FAQ() {
  const faqs = await api.get<FAQType[]>('/faq');
  const categories = await api.get<Category[]>('/faq/categories');
  return <FaqContainer faqs={faqs.data} categories={categories.data} />;
}
