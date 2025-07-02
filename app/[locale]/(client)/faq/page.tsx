import * as React from 'react';
import { Cable, Layers } from 'lucide-react';
import { Metadata } from 'next';

import FaqContainer from '@/app/[locale]/(client)/faq/faq-container';
import SubClientLayout from '@/app/[locale]/(client)/sub-client-layout';
import {
  getFAQCategoryList,
  getFAQList,
} from '@/app/[locale]/actions/faq.actions';
import { BreadcrumbItemType } from '@/components/ui/breadcrumb';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  {
    icon: Layers,
    href: '/',
    label: 'Головна',
  },
  {
    icon: Cable,
    href: '/faq',
    label: 'FAQ',
  },
];

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    "Відповіді на часто задавані питання про наші проєкти, об'єднання та інші аспекти. Знайдіть необхідну інформацію швидко та зручно.",
};

export default async function Page() {
  const faqs = await getFAQList();
  const categories = await getFAQCategoryList();

  if (categories?.length === 0 || faqs?.length === 0) return null;

  return (
    <SubClientLayout pageTitle="FAQ" breadcrumbs={BREADCRUMBS_ITEMS}>
      <FaqContainer faqs={faqs} categories={categories} />
    </SubClientLayout>
  );
}
