import { FC } from 'react';
import Image from 'next/image';

import { fullName } from '@/lib/full-name';
import { Manager } from '@/types/manager';

interface ManagerCardProps {
  manager: Manager;
}

const PHOTO_VARS = '[--photo-w:90px] md:[--photo-w:115px] xl:[--photo-w:150px]';
const PHOTO_SIZE = 'aspect-[3/4] w-[var(--photo-w)]';

const ManagerCard: FC<ManagerCardProps> = ({ manager }) => {
  const { firstName, lastName, position, duties, image } = manager;
  const displayName = fullName(lastName, firstName);

  return (
    <div
      className={`${PHOTO_VARS} grid grid-cols-[var(--photo-w)_minmax(0,1fr)] gap-x-4 gap-y-3 md:grid-rows-[minmax(calc(var(--photo-w)*2/3),auto)_1fr] md:gap-y-2`}
    >
      {image ? (
        <Image
          className={`${PHOTO_SIZE} h-auto self-start rounded-[10px] object-cover md:row-span-2`}
          src={image}
          alt={displayName}
          width={174}
          height={232}
        />
      ) : (
        <div
          className={`${PHOTO_SIZE} self-start rounded-[10px] bg-greyBlue/30 md:row-span-2`}
        />
      )}

      <div className="min-w-0">
        <p className="text-m-p font-light lg:text-l-p">{position}</p>
        <h3 className="mt-1 break-words text-m-h1 font-semibold leading-tight lg:text-h3">
          {displayName}
        </h3>
      </div>

      <div className="col-span-2 min-w-0 md:col-span-1 md:self-start">
        <h4 className="mb-1 text-l-p font-semibold">{"Обов'язки"}</h4>
        <p className="text-m-p font-light lg:text-l-p">{duties}</p>
      </div>
    </div>
  );
};

export default ManagerCard;
