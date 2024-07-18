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
    <Breadcrumb className="h-20 flex flex-row w-full mx-3">
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

const AsideCategories = () => {
  return (
    <aside className="w-1/11 flex">
      <ul className="w-full flex flex-col gap-1">
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base sm:text-xl xsm:text-xl"
          >
            Загальні питання
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base sm:text-xl xsm:text-xl"
          >
            Отримати документи
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base sm:text-xl xsm:text-xl"
          >
            Головна інформація
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base sm:text-xl xsm:text-xl"
          >
            Питання до студради
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base sm:text-xl xsm:text-xl"
          >
            Питання студентам
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base sm:text-xl xsm:text-xl"
          >
            Поширенні запитання
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base sm:text-xl xsm:text-xl"
          >
            Питання про вступ
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base sm:text-xl xsm:text-xl"
          >
            Організаційні питання
          </Button>
        </li>
      </ul>
    </aside>
  );
};
