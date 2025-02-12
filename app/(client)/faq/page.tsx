import * as React from 'react';
import { Cable, Layers } from 'lucide-react';

import FaqContainer from '@/app/(client)/faq/faq-container';
import SubClientLayout from '@/app/(client)/sub-client-layout';
import { getFAQCategoryList, getFAQList } from '@/app/actions/faq.actions';
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
