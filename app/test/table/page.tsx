import React from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const rows = [
  {
    question: 'Проєкт такий-то такий-то 1',
    answer: `Виберіть групу у випадаючому списку. Надайте застосунку
      необхідні дозволи, та через`,
  },
  {
    question: 'Проєкт такий-то такий-то 2',
    answer: `Виберіть групу у випадаючому списку. Надайте застосунку
      необхідні дозволи, та через`,
  },
  {
    question: 'Проєкт такий-то такий-то 3',
    answer: `Виберіть групу у випадаючому списку. Надайте застосунку
      необхідні дозволи, та через`,
  },
  {
    question: 'Проєкт такий-то такий-то 4',
    answer: `Виберіть групу у випадаючому списку. Надайте застосунку
      необхідні дозволи, та через`,
  },
];

const projects = [
  {
    name: 'Назва якогось там гуртку',
    description:
      'Опис опис опис лпис воашлвоашлвощаолліаор Опис опис опис лпис воашлвоашлвощаолліаор',
  },
  {
    name: 'Назва якогось там гуртку',
    description:
      'Опис опис опис лпис воашлвоашлвощаолліаор Опис опис опис лпис воашлвоашлвощаолліаор',
  },
  {
    name: 'Назва якогось там гуртку',
    description:
      'Опис опис опис лпис воашлвоашлвощаолліаор Опис опис опис лпис воашлвоашлвощаолліаор',
  },
  {
    name: 'Назва якогось там гуртку',
    description:
      'Опис опис опис лпис воашлвоашлвощаолліаор Опис опис опис лпис воашлвоашлвощаолліаор',
  },
];
const TableDemo = () => {
  return (
    <main className="pt-5 md:pt-8 lg:pt-12 ">
      <section className="_container">
        <h2 className="text-center text-h1">Приклад таблиці FAQ</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>питання</TableHead>
              <TableHead>Відповідь</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button size="sm" className="rounded-[10px] font-medium">
                    категорія
                  </Button>
                </TableCell>
                <TableCell>{row.question}</TableCell>
                <TableCell>{row.answer}</TableCell>
                <TableCell className="">
                  <div className="flex gap-1 md:gap-2 lg:gap-4 flex-wrap md:flex-nowrap items-center justify-end">
                    <Button size="sm" className="rounded-[10px] font-medium">
                      Змінити
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-[10px] font-medium"
                    >
                      Видалити
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Button
                  variant="outline"
                  className="gap-6 text-blue bg-white hover:bg-blue hover:text-white py-2 px-4 md:py-2 md:px-4 lg:py-4 lg:px-6 rounded-[10px] sm:rounded-[10px] lg:rounded-[18px] font-bold"
                >
                  <PlusIcon className="h-6 w-6" />
                  <span>Додати питання</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
      <section className="_container">
        <h2 className="text-center text-h1">Приклад таблиці проєктів</h2>
        <Table>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <div className="flex align-middle gap-1 md:gap-2 lg:gap-4 flex-wrap md:flex-nowrap items-center justify-end">
                    <Button size="sm" className="rounded-[10px] font-medium">
                      Змінити
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-[10px] font-medium"
                    >
                      Видалити
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Button
                  variant="outline"
                  className="gap-6 text-blue bg-white hover:bg-blue hover:text-white py-2 px-4 md:py-2 md:px-4 lg:py-4 lg:px-6 rounded-[10px] sm:rounded-[10px] lg:rounded-[18px] font-bold"
                >
                  <PlusIcon className="h-6 w-6" />
                  <span>Додати проєкт</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </main>
  );
};

export default TableDemo;
