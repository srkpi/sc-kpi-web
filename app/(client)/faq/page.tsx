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
    <header className="w-full flex flex-col">
      <Breadcrumbs />
      <main className="flex lg:flex-row md:flex-col sm:flex-col justify-evenly just">
        <AsideCategories />
        <FAQAccordion />
      </main>
    </header>
  );
}

const Breadcrumbs = () => {
  return (
    <Breadcrumb className="w-1/10 h-20 flex flex-row">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Layers /> Головна
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Cable /> Часті питання
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const AsideCategories = () => {
  return (
    <aside className="w-1/11 h-screen flex">
      <ul className="w-full flex flex-col gap-1">
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base"
          >
            Загальні питання
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base"
          >
            Отримати документи
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base"
          >
            Головна інформація
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base"
          >
            Питання до студради
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base "
          >
            Питання студентам
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base "
          >
            Поширенні запитання
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base"
          >
            Питання про вступ
          </Button>
        </li>
        <li>
          <Button
            variant={'outline'}
            size={'sm'}
            className="w-full not-italic font-normal leading-normal text-base "
          >
            Організаційні питання
          </Button>
        </li>
      </ul>
    </aside>
  );
};
