import {
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiTelegram,
  SiTiktok,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import {
  BotIcon,
  CableIcon,
  MailIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import Image from 'next/image';

import { LinkItem } from '@/types/link-item';

export const supportItems: LinkItem[] = [
  {
    name: 'FAQ',
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
    href: 'https://t.me/+eOL9MI1XaowzYjUy',
    icon: <SiTelegram className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://www.instagram.com/sr_kpi/',
    icon: <SiInstagram className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://www.tiktok.com/@sr_kpi',
    icon: <SiTiktok className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://www.facebook.com/srkpi/',
    icon: <SiFacebook className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://x.com/sr_kpi',
    icon: <SiX className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://discord.gg/V4YvUsYtSj',
    icon: <SiDiscord className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://www.youtube.com/@sr_kpi',
    icon: <SiYoutube className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://github.com/srkpi',
    icon: <SiGithub className="size-[15px] md:size-[20px]" />,
  },
  {
    href: 'https://kpistats.onrender.com/linkedin',
    icon: (
      <Image
        quality={100}
        src="/icons/linkedin.svg"
        alt="linkedin"
        width={24}
        height={24}
        className="size-[15px] md:size-[20px]"
      />
    ),
  },
];
