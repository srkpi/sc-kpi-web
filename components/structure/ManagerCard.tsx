import { FC } from 'react';
import Image from 'next/image';

import { fullName } from '@/lib/full-name';
import { Manager } from '@/types/manager';

interface ManagerCardProps {
  manager: Manager;
}

const PHOTO_SIZE = 'aspect-[3/4] w-[110px] md:w-[140px] xl:w-[174px]';

const ManagerCard: FC<ManagerCardProps> = ({ manager }) => {
  const { firstName, lastName, position, duties, image } = manager;
  const displayName = fullName(lastName, firstName);

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 md:grid-rows-[auto_1fr]">
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
        <p className="text-m-p lg:text-l-p">{position}</p>
        <h3 className="mt-1 break-words text-m-h1 font-semibold leading-tight lg:text-h2">
          {displayName}
        </h3>
      </div>

      <div className="col-span-2 min-w-0 md:col-span-1 md:self-end">
        <h4 className="mb-1 text-l-p font-semibold">{"Обов'язки"}</h4>
        <p className="text-m-p lg:text-l-p">{duties}</p>
      </div>
    </div>
  );
};

export default ManagerCard;
