'use client';
import * as React from 'react';
import { FC, useMemo, useState } from 'react';
import { Cable, Layers } from 'lucide-react';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BreadcrumbItemType, Breadcrumbs } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/types/category';
import { FAQType } from '@/types/faq';

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

interface FaqPagerops {
  categories: Category[];
  faqs: FAQType[];
}

const FaqContainer: FC<FaqPagerops> = ({ categories, faqs }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  const filteredFaqs = useMemo(() => {
    if (!selectedCategory) return faqs;

    return faqs?.filter(faq => faq.category.name === selectedCategory);
  }, [faqs, selectedCategory]);
  return (
    <div className="_container">
      <Breadcrumbs
        className="mt-[20px] md:mt-[40px]"
        items={BREADCRUMBS_ITEMS}
      />
      <main className="flex xsm:flex-col sm:gap-2 xsm:gap-2 mt-[20px] md:mt-[65px] lg:gap-32 sm:flex-col md:flex-col lg:flex-row min-[390px]:flex-col max-[390px]:flex-col">
        <aside className="h-full w-full lg:max-w-64 flex mb-3">
          <div className="block md:hidden">
            <Select
              onValueChange={e => {
                setSelectedCategory(e);
              }}
              defaultValue={categories[0].name}
              value={selectedCategory}
            >
              <SelectTrigger className="w-full border-blue">
                <SelectValue placeholder="Обрати категорію" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map(category => (
                  <SelectItem
                    key={category.id}
                    value={category.name}
                    id={category.id.toString()}
                    className="bg-dark z-10 select-none"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="hidden md:block">
            <ul className="w-full flex flex-col gap-[10px]">
              {categories?.map(category => (
                <li key={category.id}>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-[255px] ${category.name === selectedCategory ? 'bg-blue' : 'bg-transparent'} rounded-none not-italic font-normal leading-normal text-base p-1`}
                    value={category.name}
                    onClick={event => {
                      setSelectedCategory(event.currentTarget.value);
                    }}
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <Accordion
          type="multiple"
          id="faq-accordion"
          className="flex flex-1 flex-col gap-2 w-full max-w-screen md:max-w-screen-lg sm:max-w-screen-sm text-left not-italic font-normal leading-normal text-base"
        >
          {filteredFaqs?.map(faq => (
            <AccordionItem
              key={faq.id}
              id={faq.id.toString()}
              value={faq.id.toString()}
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>

      <div className="w-full h-full flex self-end justify-end items-center py-[70px] md:pb-0 md:pt-[100px]">
        <div className="rounded-3xl bg-gradient-to-b from-accent to-dark max-[1023px]:w-full">
          <div className="bg-dark rounded-3xl m-0.5 p-8 flex flex-col justify-between items-center h-36">
            <p className="text-base">Залишилися питання?</p>
            <Link href="https://t.me/suggestSRbot">
              <Button
                className="select-none font-normal group"
                variant="outline"
                size="sm"
              >
                Пиши в{' '}
                <span className="text-blue ml-1 group-hover:text-red">
                  {' '}
                  @suggestSRbot
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FaqContainer;
