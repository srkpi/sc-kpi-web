import { CopyrightIcon } from 'lucide-react';
import Image from 'next/image';

import FooterColumn from '@/components/footer/components/footer-column';
import FooterMedia from '@/components/footer/components/footer-media';
import {
  mainItems,
  mediaItems,
  otherItems,
  supportItems,
} from '@/components/footer/constants';

const Footer = () => {
  return (
    <footer className="pt-[100px] px-[100px] pb-[77px]">
      <div className="flex align-top justify-between flex-wrap">
        <div>
          <Image
            className="object-contain align-top"
            src="/images/Logo.png"
            alt="logo"
            width={200}
            height={73}
          />
        </div>
        <FooterColumn name="Основні сторінки" items={mainItems} />
        <FooterColumn name="Підтримка" items={supportItems} />
        <div className="flex flex-col gap-[50px]">
          <FooterColumn items={otherItems} />
          <FooterMedia items={mediaItems} />
        </div>
        <Image
          className="self-end"
          src="/images/qrcode.png"
          alt="qrcode"
          width={200}
          height={200}
        />
      </div>
      <div className="flex gap-[9px] items-center">
        <CopyrightIcon size={20} />
        <p className="font-p">2024 Студентська рада КПІ</p>
      </div>
    </footer>
  );
};

export default Footer;
