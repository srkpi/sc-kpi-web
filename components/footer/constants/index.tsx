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
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';
import Image from 'next/image';

import { LinkItem } from '@/types/link-item';

export const supportItems: LinkItem[] = [
  {
    name: 'Часті питання',
    href: '/faq',
    icon: <CableIcon className="size-[15px] md:size-[20px]" />,
  },
  {
    name: '@suggestSRbot',
    href: 'https://t.me/suggestSRbot',
    icon: <BotIcon className="size-[15px] md:size-[20px]" />,
  },
  {
    name: 'sr@kpi.ua',
    href: 'mailto:sr@kpi.ua',
    icon: <MailIcon className="size-[15px] md:size-[20px]" />,
  },
];

export const otherItems: LinkItem[] = [
  {
    name:
      'Студентська рада КПІ ім. Ігоря Сікорського\n' +
      '03056, Україна, м. Київ\n' +
      'Берестейський проспект, 37, корп. 1, ауд. 165',
    href: 'https://maps.app.goo.gl/uvPEXUy7zWFx7Zyn6',
    icon: <MapPinIcon className="size-[15px] md:size-[20px]" />,
  },
  {
    name: 'Політика конфіденційності',
    href: '/privacy',
    icon: <ShieldCheckIcon className="size-[15px] md:size-[20px]" />,
  },
];

export const mediaItems: LinkItem[] = [
  {
    href: 'https://t.me/sr_kpi',
    icon: (
      <Image
        quality={100}
        src="/icons/telegram.png"
        alt="telegram"
        width={24}
        height={24}
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
      <Image
        quality={100}
        src="/icons/tik-tok.png"
        alt="tik-tok"
        width={24}
        height={24}
        className="size-[15px] md:size-[20px]"
      />
    ),
  },
  {
    href: 'https://www.facebook.com/srkpi/',
    icon: <FacebookIcon className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://x.com/sr_kpi',
    icon: <TwitterIcon className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://discord.gg/V4YvUsYtSj',
    icon: (
      <Image
        quality={100}
        src="/icons/discord.png"
        alt="tik-tok"
        width={24}
        height={24}
        className="size-[15px] md:size-[20px]"
      />
    ),
  },
  {
    href: 'https://www.youtube.com/@studradakpi1998',
    icon: <YoutubeIcon className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://github.com/srkpi',
    icon: <GithubIcon className="size-[15px] md:size-[20px]" />,
  },
];
