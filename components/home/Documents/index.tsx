import { FileInputIcon } from 'lucide-react';
import Link from 'next/link';

const Documents = () => {
  return (
    <div className="">
      <h2 className="font-h1 mb-4">Документи</h2>
      <h4 className="font-p mb-4">Положення про ОСС</h4>
      <Link
        className="min-h-[70px] max-w-[360px] flex gap-4 bg-gradient-to-r hover:translate-x-1 transition-all from-dark to-accent rounded-[10px] items-center p-[15px] mb-5"
        href="https://t.me/oss_kpi_archive/105"
        download
      >
        <FileInputIcon color="white" size={40} />
        <span className="underline">Положення про ОСС</span>
      </Link>
      <h4 className="font-p mb-4">Закон про вищу освіту</h4>
      <Link
        className="min-h-[70px] max-w-[360px] flex gap-4 bg-gradient-to-r hover:translate-x-1 transition-all from-dark to-accent rounded-[10px] items-center p-[15px] mb-5"
        href=" https://zakon.rada.gov.ua/laws/show/1556-18#Text"
        download
      >
        <FileInputIcon color="white" size={40} />
        <span className="underline">Закон про вищу освіту</span>
      </Link>
    </div>
  );
};

export default Documents;
