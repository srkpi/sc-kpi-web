import {
  BriefcaseBusinessIcon,
  CableIcon,
  LaptopMinimalCheck,
  LibraryIcon,
  PaletteIcon,
  PaperclipIcon,
  Presentation,
} from 'lucide-react';

type Props = {
  icon: React.ReactNode;
  href: string;
  title: string;
};

export const navbarLinks: Props[] = [
  {
    icon: <PaletteIcon width={28} height={28} />,
    href: '/admin/clubs',
    title: "Cтуд. об'єднання",
  },
  {
    icon: <Presentation width={28} height={28} />,
    href: '/admin/projects',
    title: 'Проєкти',
  },
  {
    icon: <LibraryIcon width={28} height={28} />,
    href: '/admin/categories',
    title: 'Категорії',
  },
  {
    icon: <LaptopMinimalCheck width={28} height={28} />,
    href: '/admin/skills',
    title: 'Навички',
  },
  {
    icon: <LaptopMinimalCheck width={28} height={28} />,
    href: '/admin/statuses',
    title: 'Статуси',
  },
  {
    icon: <PaperclipIcon width={28} height={28} />,
    href: '/admin/departments',
    title: 'Департаменти',
  },
  {
    icon: <CableIcon width={28} height={28} />,
    href: '/admin/faq',
    title: 'FAQ',
  },
  {
    icon: <BriefcaseBusinessIcon width={28} height={28} />,
    href: '/admin/services',
    title: 'Служби',
  },
];
