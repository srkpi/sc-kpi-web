import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Department } from '@/types/departments';

interface ClubCardProps {
  club: Department;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const { id, name, categories, shortDescription, image, buttonLink } = club;
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measureRef.current || categories.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleCount(0);
      return;
    }

    const wrapper = measureRef.current;
    const children = Array.from(wrapper.children) as HTMLElement[];

    const baseTop = children[0]?.offsetTop ?? 0;
    let maxVisible = children.length;

    for (let i = 1; i < children.length; i++) {
      if (children[i].offsetTop > baseTop) {
        maxVisible = i;
        break;
      }
    }

    setVisibleCount(maxVisible);
  }, [categories]);

  const visible = expanded ? categories : categories.slice(0, visibleCount);
  const hidden = categories.length - visibleCount;

  return (
    <div className="rounded-lg shadow-lg flex flex-col justify-between p-4">
      <div className="relative rounded-lg flex items-center justify-center">
        <Image
          className="object-cover rounded-lg w-full max-w-md aspect-square"
          src={image}
          alt="image"
          quality={100}
          width={500}
          height={500}
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2 overflow-hidden">
        {visible.map((category, index) => (
          <span
            key={index}
            className="tag bg-blue text-white px-3 py-1 rounded-md text-sm inline-flex max-w-max"
          >
            {category.name}
          </span>
        ))}
        {hidden > 0 && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="bg-transparent border border-blue text-blue px-3 py-1 rounded-md text-sm"
          >
            +{hidden}
          </button>
        )}
        {hidden > 0 && expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="bg-transparent border border-blue text-blue px-3 py-1 rounded-md text-sm"
          >
            Приховати
          </button>
        )}
      </div>

      <div
        ref={measureRef}
        className="invisible absolute top-0 left-0 w-[290px] md:w-[400px] p-4 h-[650px] md:h-[680px] flex gap-2 flex-wrap"
      >
        {categories.map((category, index) => (
          <span
            key={index}
            className="tag bg-blue text-white px-3 py-1 rounded-md text-sm inline-flex max-w-max"
          >
            {category.name}
          </span>
        ))}
      </div>

      <h2 className="font-m-h1 md:font-h3 mt-4 text-left">{name}</h2>

      <div
        className="font-p md:font-m-p mt-2 mb-4 flex-grow overflow-hidden min-h-[60px] text-left"
        dangerouslySetInnerHTML={{ __html: shortDescription }}
      />

      <div className="flex w-full flex-wrap gap-2 mt-4 md:mt-auto">
        <Link href={buttonLink} className="flex-1 min-w-0">
          <Button
            variant="default"
            className="w-full min-w-0 px-2 h-[40px] md:h-[50px] md:rounded-[6px]"
          >
            Доєднатись
          </Button>
        </Link>

        <Link href={`/clubs/${id}`} className="flex-1 min-w-0">
          <Button
            variant="outline"
            className="w-full min-w-0 px-2 h-[40px] md:h-[50px] md:rounded-[6px]"
          >
            Детальніше
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;
