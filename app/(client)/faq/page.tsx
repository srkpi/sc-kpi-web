'use client';
import * as React from 'react';
import { Cable, Layers } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function FAQ() {
  return (
    <div className="ml-0 m-0 lg:ml-12 xsm:ml-0">
      <div className="w-full flex flex-col justify-around">
        <Breadcrumb className="h-20 flex flex-row mx-12 max-[1280px]:mx-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="flex flex-row xsm:items-center gap-3 items-center"
              >
                <Layers className="scale-125" /> Головна
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="flex flex-row xsm:items-center gap-3 items-center">
                <Cable className="scale-125" /> Часті питання
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <main className="flex xsm:flex-col sm:gap-2 xsm:gap-2 lg:gap-32 sm:flex-col md:flex-col lg:flex-row min-[390px]:flex-col max-[390px]:flex-col px-12 max-[1280px]:px-3">
        <AsideCategories />
        <FAQAccordion />
      </main>
      <div className="w-full h-48 mb-12">
        <TextBot />
      </div>
    </div>
  );
}

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

const AsideCategories = () => {
  const textValue: { [text: string]: string } = {
    'Загальні питання': 'general',
    'Отримати документи': 'documents',
    'Головна інформація': 'info',
    'Питання студентам': 'students',
    'Поширені запитання': 'common',
    'Питання про вступ': 'admission',
    'Організаційні питання': 'org',
  };

  const SelectButtonsList = () => {
    return (
      <Select
        onValueChange={function (e) {
          ToggleAccordionItems(e);
        }}
      >
        <SelectTrigger className="w-full border-blue">
          <SelectValue placeholder="Обрати категорію" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(textValue).map(key => {
            return (
              <SelectItem
                key={key}
                value={textValue[key]}
                id={textValue[key]}
                className="bg-dark z-10 select-none"
              >
                {key}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  };

  const ButtonsList = () => {
    return (
      <ul className="w-full flex flex-col gap-1">
        {Object.keys(textValue).map(key => {
          return (
            <li key={key}>
              <Button
                variant={'outline'}
                size={'sm'}
                className="w-full not-italic font-normal leading-normal text-base p-1"
                value={textValue[key]}
                onClick={event => {
                  ToggleAccordionItems(event.currentTarget.value);
                }}
              >
                {key}
              </Button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside className="h-full w-full max-w-full lg:max-w-64 xsm:max-w-screen-xsm flex mb-3">
      <div className="hidden min-[360px]:block min-[1024px]:hidden">
        <SelectButtonsList />
      </div>
      <div className="hidden min-[1024px]:block">
        <ButtonsList />
      </div>
    </aside>
  );
};

const TextBot = () => {
  return (
    <div className="w-full h-full flex self-end justify-end items-center pr-24 pt-24 max-[1280px]:p-3">
      <div className="rounded-3xl bg-gradient-to-b from-accent to-dark max-[1023px]:w-full">
        <div className="bg-dark rounded-3xl m-0.5 p-8 flex flex-col justify-between items-center h-36">
          <p className="text-base">Залишилися питання?</p>
          <Button
            className="select-none font-normal"
            variant={'outline'}
            size={'sm'}
          >
            Пиши в <span className="text-blue ml-1">@suggestSRbot</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const FAQAccordion = () => {
  return (
    <Accordion
      type="multiple"
      className="flex flex-1 flex-col gap-2 w-full max-w-screen lg:max-w-screen-xl md:max-w-screen-lg sm:max-w-screen-sm text-left not-italic font-normal leading-normal text-base"
      id="faq-accordion"
    >
      <AccordionItem
        id="where-to-find-required-document"
        value={'where-to-find-required-document'}
      >
        <AccordionTrigger>
          Не знаю де отримати необхідний документ
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
          odio necessitatibus hic? Quas quia sit doloribus dolore maxime,
          blanditiis dicta quasi at eos necessitatibus quo quaerat, sed a
          architecto vitae?
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        id="conflict-with-professeur"
        value={'conflict-with-professeur'}
      >
        <AccordionTrigger>
          Виникла конфліктна ситуація з викладачем, не знаю до кого звернутися
        </AccordionTrigger>
        <AccordionContent>
          Звернися до студентської ради підрозділу (лінк на канали СР
          підрозділів). Якщо не знаєш де це, пиши до нас (лінк на саппорт)
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="do-not-understand" value={'do-not-understand'}>
        <AccordionTrigger>
          Не розумію, що мається на увазі в положенні
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo debitis
          exercitationem mollitia nihil expedita quos ad. Voluptas et, commodi
          dignissimos nostrum cumque eum unde, maiores nulla molestiae quo
          ratione enim.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="cannot-find-info" value={'cannot-find-info'}>
        <AccordionTrigger>
          Не можу знайти необхідну інформацію щодо освітнього процесу
        </AccordionTrigger>
        <AccordionContent>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero minus
          natus omnis temporibus repellendus aperiam consequatur molestiae at id
          fugiat odio quaerat et quam fuga sunt corrupti excepturi, quae quo?
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="how-to-join-clubs" value={'how-to-join-clubs'}>
        <AccordionTrigger>
          Як можна долучитися до студентських клубів та організацій?
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          voluptatem deleniti, placeat molestiae corporis beatae qui quaerat
          illo adipisci autem neque delectus, dolor, nulla tenetur repudiandae
          laborum facere laudantium minus!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="how-to-be-in-touch" value={'how-to-be-in-touch'}>
        <AccordionTrigger>
          Як дізнатися про зміни в розкладі занять?
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
          vitae unde at ratione laboriosam praesentium non impedit eos accusamus
          libero debitis tempore, voluptatum ipsam, molestiae perferendis, nisi
          distinctio temporibus corporis?
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        id="what-documents-are-required"
        value={'what-documents-are-required'}
      >
        <AccordionTrigger>
          Які документи потрібні для отримання стипендії?
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
          dolorem quae nulla reiciendis, est dolorum recusandae omnis quam
          necessitatibus totam. Quis mollitia perspiciatis incidunt? Fuga eius
          soluta repudiandae excepturi tempore!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
