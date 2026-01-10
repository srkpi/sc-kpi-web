import Image from 'next/image';
import Link from 'next/link';

import ArrowLeft from '@/components/sliders/ArrowLeft';
import ArrowRight from '@/components/sliders/ArrowRight';
import { Button } from '@/components/ui/button';
import { Department } from '@/types/departments';

interface DepartmentMoblieCardProps {
  dep: Department;
  next: () => void;
  prev: () => void;
}

const DepartmentMoblieCard = ({
  dep,
  next,
  prev,
}: DepartmentMoblieCardProps) => {
  return (
    <div className="flex md:hidden flex-col gap-5 sm:gap-8 items-center max-w-[500px] mx-auto">
      <div className="flex gap-1 w-full justify-between items-center">
        <ArrowLeft onClick={prev} />
        <h2 className="font-h3 text-m-h1 sm:text-[24px]">{dep.name}</h2>
        <ArrowRight onClick={next} />
      </div>
      <div className="max-h-[420px] aspect-[36/21] overflow-hidden w-[100%] rounded-[20px]">
        <Image
          className="object-cover w-full h-full"
          width={720}
          height={420}
          quality={100}
          src={dep.image}
          alt={dep.name}
        />
      </div>
      <p className="text-center font-m-p text-m-p sm:text-p">
        {dep.shortDescription}
      </p>
      <Link href={`/departments/${dep.id}`}>
        <Button size="sm" className="min-w-[270px] sm:min-w-[290px]">
          Дізнатись більше
        </Button>
      </Link>
    </div>
  );
};

export default DepartmentMoblieCard;
