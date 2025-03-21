import { LinkItem } from '@/types/link-item';

export const linkItems: LinkItem[] = [
  {
    name: 'Розклад',
    href: '/schedule-importer',
  },
  {
    name: "Cтудентські об'єднання",
    href: '/clubs',
  },
  {
    name: 'Аналітика',
    href: process.env.NEXT_PUBLIC_ANALYTICS_URL || '#',
  },
  {
    name: 'FAQ',
    href: '/faq',
  },
];
