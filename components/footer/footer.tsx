import { CopyrightIcon } from 'lucide-react';
import Image from 'next/image';

import FooterColumn from '@/components/footer/components/footer-column';
import FooterMedia from '@/components/footer/components/footer-media';
import {
  mediaItems,
  otherItems,
  supportItems,
} from '@/components/footer/constants';
import { linkItems } from '@/constants/link-items';

const Footer = () => {
  return (
    <footer className="p-[14px] md:p-[32px] lg:p-[64px] xl:p-[100px]">
      <div className="flex align-top justify-between flex-wrap">
        <div className="w-screen xl:w-auto mb-[20px]">
          <Image
            className="object-cover align-top w-[67px] md:w-[100px] lg:w-[200px] h-auto"
            src="/images/Logo.png"
            alt="logo"
            width={200}
            height={73}
          />
        </div>
        <FooterColumn name="Основні сторінки" items={linkItems} />
        <FooterColumn name="Підтримка" items={supportItems} />
        <div className="hidden lg:flex lg:flex-col">
          <FooterColumn items={otherItems} />
          <FooterMedia items={mediaItems} />
        </div>
        <FooterColumn className="block lg:hidden" items={otherItems} />
        <FooterMedia className="block lg:hidden" items={mediaItems} />
        <Image
          className="md:self-end self-center size-[100px] md:size-[200px]"
          src="/images/qrcode.png"
          alt="qrcode"
          width={200}
          height={200}
        />
      </div>
      <div className="flex gap-[9px] items-center mt-[10px]">
        <CopyrightIcon className="size-[15px] md:size-[20px]" />
        <p className="font-p text-m-p md:text-p">2024 Студентська рада КПІ</p>
      </div>
    </footer>
  );
};

export default Footer;
