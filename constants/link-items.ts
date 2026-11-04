import { LinkItem } from '@/types/link-item';

export const linkItems: LinkItem[] = [
  {
    name: 'Структура',
    href: '/structure',
  },
  {
    name: "Cтудентські об'єднання",
    href: '/clubs',
  },
  // {
  //   name: 'Проєкти',
  //   href: '/projects',
  // },
  {
    name: 'Аналітика',
    href: process.env.NEXT_PUBLIC_ANALYTICS_URL || '#',
  },
  {
    name: 'FAQ',
    href: '/faq',
  },
];
