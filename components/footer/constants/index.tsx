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
    href: '/schedule-importer',
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
    href: 'https://t.me/suggestSRbot',
    icon: <BotIcon size={20} />,
  },
  {
    name: 'studradakpi1998@gmail.com',
    href: 'studradakpi1998@gmail.com',
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
    href: 'https://t.me/sr_kpi',
    icon: (
      <img
        src="/svgs/telegram.svg"
        alt="telegram"
        className="size-[15px] md:size-[20px]"
      />
    ),
  },
  {
    href: 'https://www.instagram.com/sr_kpi/',
    icon: <InstagramIcon className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://www.tiktok.com/@sr_kpi',
    icon: (
      <img
        src="/svgs/tik-tok.svg"
        alt="tik-tok"
        className="size-[15px] md:size-[20px]"
      />
    ),
  },
  {
    href: 'https://www.facebook.com/srkpi/',
    icon: <FacebookIcon className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://github.com/srkpi',
    icon: <GithubIcon className="size-[15px] md:size-[20px]" />,
  },
];
