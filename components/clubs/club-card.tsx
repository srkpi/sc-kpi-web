import Image from 'next/image';
import Link from 'next/link';

import CategoryTag from '@/components/clubs/category-tag';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { Department } from '@/types/departments';

interface ClubCardProps {
  club: Department;
}

const BUTTON_CLASSES = cn(
  'h-auto min-w-0 w-full rounded-[6px] border-[2.1px] border-brand px-[10px] py-[11px]',
  'font-medium tracking-normal text-l-p leading-normal text-[#f2f2f2]',
  'md:px-6 md:py-[14px] md:text-[18px]',
);

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const { id, name, categories, shortDescription, image, buttonLink } = club;

  return (
    <div className="flex h-full flex-col gap-[18px] rounded-[12px] bg-layer-l3 p-4 md:min-h-[384px] md:gap-7 md:rounded-[16px]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <div className="flex items-center gap-4 md:contents">
          <Image
            className="size-[100px] shrink-0 rounded-[9px] object-cover md:size-[180px] md:rounded-[12px]"
            src={image}
            alt={name}
            quality={100}
            width={360}
            height={360}
          />
          <h2 className="min-w-0 flex-1 break-words text-left text-[21px] font-medium leading-normal text-white md:hidden">
            {name}
          </h2>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[21px] md:self-stretch">
          <h2 className="hidden break-words text-left text-[28px] font-medium leading-normal text-white md:block">
            {name}
          </h2>

          {categories.length > 0 && (
            <div className="flex flex-wrap items-start gap-2 md:gap-3">
              {categories.map(category => (
                <CategoryTag key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="line-clamp-3 text-left text-l-p leading-normal text-white md:text-[18px]"
        dangerouslySetInnerHTML={{ __html: shortDescription }}
      />

      <div className="mt-auto flex w-full items-center gap-2 md:gap-3">
        <Button
          asChild
          className={cn(BUTTON_CLASSES, 'flex-1 bg-brand hover:bg-brand/80')}
        >
          <Link href={buttonLink}>
            <span className="md:hidden">Приєднатися!</span>
            <span className="hidden md:inline">Хочу приєднатися!</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className={cn(BUTTON_CLASSES, 'w-auto hover:bg-brand/20')}
        >
          <Link href={`/clubs/${id}`}>Детальніше</Link>
        </Button>
      </div>
    </div>
  );
};

export default ClubCard;
