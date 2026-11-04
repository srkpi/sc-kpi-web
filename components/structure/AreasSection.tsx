import { FC } from 'react';
import Image from 'next/image';

import { fullName } from '@/lib/full-name';
import { Area } from '@/types/area';

interface AreasSectionProps {
  areas: Area[];
}

const AreasSection: FC<AreasSectionProps> = ({ areas }) => {
  if (areas.length === 0) return null;

  return (
    <section className="mt-[30px] lg:mt-[50px]">
      <h2 className="text-h2 font-semibold mb-4 lg:mb-6">Напрямки роботи</h2>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {areas.map(area => (
          <li key={area.id} className="flex flex-col gap-1">
            <div className="flex-1 rounded-[10px] bg-gray p-4">
              <h3 className="text-m-h1 lg:text-h3 font-semibold mb-3">
                {area.name}
              </h3>
              <p className="text-m-p lg:text-l-p">{area.description}</p>
            </div>
            <div className="flex items-center gap-4 rounded-[10px] bg-gray p-3">
              {area.image ? (
                <Image
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                  src={area.image}
                  alt={fullName(area.headLastName, area.headFirstName)}
                  width={56}
                  height={56}
                />
              ) : (
                <div className="h-14 w-14 shrink-0 rounded-full bg-greyBlue/30" />
              )}
              <div>
                <p className="text-l-p font-semibold">Відповідальний/а</p>
                <p className="text-m-p">
                  {fullName(area.headLastName, area.headFirstName)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AreasSection;
