import React from 'react';
import {
  BotIcon,
  CableIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from 'lucide-react';

import { Item } from '@/components/footer/types';

export const mainItems: Item[] = [
  {
    name: 'Головна',
    href: '/',
  },
  {
    name: 'Розклад',
    href: '/schedule',
  },
  {
    name: 'Гуртки',
    href: '/clubs',
  },
];

export const supportItems: Item[] = [
  {
    name: 'Часті питання',
    href: '/faq',
    icon: <CableIcon size={20} />,
  },
  {
    name: '@suggestSRbot',
    href: '#',
    icon: <BotIcon size={20} />,
  },
  {
    name: 'studradakpi1998@gmail.com',
    href: '#',
    icon: <MailIcon size={20} />,
  },
];

export const otherItems: Item[] = [
  {
    name:
      'Студентська рада КПІ ім. Ігоря Сікорського\n' +
      '03056, Україна, м. Київ\n' +
      'Берестейський проспект, 37, корп. 1, ауд. 165',
    href: '#',
    icon: <MapPinIcon size={20} />,
  },
  {
    name: 'Політика конфіденційності',
    href: '/privacy',
    icon: <ShieldCheckIcon size={20} />,
  },
];

export const mediaItems: Item[] = [
  {
    href: 'https://instagram.com/studradakpi',
    icon: <InstagramIcon size={20} />,
  },
  {
    href: 'https://facebook.com/studradakpi',
    icon: <FacebookIcon size={20} />,
  },
  {
    href: 'https://github.com/srkpi',
    icon: <GithubIcon size={20} />,
  },
];
