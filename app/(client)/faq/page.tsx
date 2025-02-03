import * as React from 'react';
import { Cable, Layers } from 'lucide-react';

import FaqContainer from '@/app/(client)/faq/faq-container';
import SubClientLayout from '@/app/(client)/sub-client-layout';
import { BreadcrumbItemType } from '@/components/ui/breadcrumb';
import { api } from '@/lib/api';
import { Category } from '@/types/category';
import { FAQ } from '@/types/faq';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  {
    icon: Layers,
    href: '/',
    label: 'Головна',
  },
  {
    icon: Cable,
    href: '/faq',
    label: 'Часті питання',
  },
];

export default async function Page() {
  const { data: faqs } = await api.get<FAQ[]>('/faq');
  const { data: categories } = await api.get<Category[]>('/faq/categories');

  if (categories?.length === 0 || faqs?.length === 0) return null;

  return (
    <SubClientLayout pageTitle="Часті питання" breadcrumbs={BREADCRUMBS_ITEMS}>
      <FaqContainer faqs={faqs} categories={categories} />
    </SubClientLayout>
  );
}
