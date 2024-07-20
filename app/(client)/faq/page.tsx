'use client';
import { Cable, Layers } from 'lucide-react';

import { FAQAccordion } from '@/components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

export default function FAQ() {
  return (
    <>
      <header className="w-full flex flex-col justify-around">
        <Breadcrumbs />
      </header>
      <main className="flex xsm:flex-col sm:flex-col md:flex-col lg:flex-row p-1 gap-2">
        <AsideCategories />
        <FAQAccordion />
      </main>
    </>
  );
}

const Breadcrumbs = () => {
  return (
    <Breadcrumb className="h-20 flex flex-row mx-3">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Layers /> Головна
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="flex flex-row xsm:items-center gap-1">
            <Cable /> Часті питання
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

function ToggleAccordionItems(value: string) {
  const ids: string[] = [];

  // For which button value which accordion items with according ids should be displayed. If id is not present
  // in the dictionary - hide.
  const toggle_ids: { [value: string]: string[] } = {
    general: ['how-to-join-clubs', 'how-to-be-in-touch'],
    documents: [
      'where-to-find-required-document',
      'what-documents-are-required',
    ],
    info: ['cannot-find-info'],
    studrad: ['how-to-join-clubs'],
    students: [
      'conflict-with-professeur',
      'cannot-find-info',
      'how-to-be-in-touch',
    ],
    common: [
      'what-documents-are-required',
      'how-to-be-in-touch',
      'how-to-join-clubs',
      'cannot-find-info',
      'do-not-understand',
      'conflict-with-professeur',
      'where-to-find-required-document',
    ],
    admission: [],
    org: [],
  };

  if (value in toggle_ids) {
    if (document) {
      const children = document.getElementById('faq-accordion')!.childNodes;

      for (let index = 0; index < children.length; index++) {
        const child = children[index] as HTMLElement;
        ids.push(child.id);

        child.classList.remove('hidden');
        if (!toggle_ids[value].includes(child.id)) {
          child.classList.add('hidden');
        }
      }
    }
  }
}

const ToggleButton = ({ text, value }: { text: string; value: string }) => {
  return (
    <Button
      variant={'outline'}
      size={'sm'}
      className="w-full not-italic font-normal leading-normal text-base sm:text-xl xsm:text-xl"
      value={value}
      onClick={event => {
        ToggleAccordionItems(event.currentTarget.value);
      }}
    >
      {text}
    </Button>
  );
};

const AsideCategories = () => {
  return (
    <aside className="w-1/11 flex">
      <ul className="w-full flex flex-col gap-1">
        <li>
          <ToggleButton text="Загальні питання" value="general" />
        </li>
        <li>
          <ToggleButton text="Отримати документи" value="documents" />
        </li>
        <li>
          <ToggleButton text="Головна інформація" value="info" />
        </li>
        <li>
          <ToggleButton text="Питання до студради" value="studrad" />
        </li>
        <li>
          <ToggleButton text="Питання студентам" value="students" />
        </li>
        <li>
          <ToggleButton text="Поширенні запитання" value="common" />
        </li>
        <li>
          <ToggleButton text="Питання про вступ" value="admission" />
        </li>
        <li>
          <ToggleButton text="Організаційні питання" value="org" />
        </li>
      </ul>
    </aside>
  );
};
