import {
  BriefcaseBusinessIcon,
  CableIcon,
  PaletteIcon,
  PaperclipIcon,
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
