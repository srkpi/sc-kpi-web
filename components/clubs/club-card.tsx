import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Department } from '@/types/departments';

interface ClubCardProps {
  club: Department;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const { id, name, category, shortDescription, image, buttonLink } = club;
  return (
    <div className="rounded-lg w-[290px] md:w-[400px] h-[555px] shadow-lg flex flex-col justify-center">
      <div className="relative w-full h-[300px] md:h-[338px] bg-muted rounded-lg flex items-center justify-center">
        <span className="absolute top-2 left-6 font-m-button text-white bg-blue bg-opacity-75 flex items-center justify-center px-3 py-3 md:px-5 md:py-3 rounded text-m-p md:text-p h-[38px] md:h-[48px]">
          {category.toLocaleLowerCase()}
        </span>
        <img
          src={image || '/placeholder.png'}
          alt={name}
          className="w-[290px] h-[300px] md:w-[408px] md:h-[338px] object-cover rounded-lg"
        />
      </div>
      <h2 className="font-m-h1 md:font-h3 mt-4">{name}</h2>
      <p className="font-p md:font-m-p mt-2 line-clamp-4">{shortDescription}</p>
      <div className="flex justify-between mt-auto space-x-0 md:space-x-4">
        <Link href={buttonLink}>
          <Button
            variant="default"
            className="w-[130px] h-[40px] md:h-[50px] md:w-[197px] md:rounded-[6px]"
          >
            Долучитися
          </Button>
        </Link>
        <Link href={`/clubs/${id}`}>
          <Button
            variant="outline"
            className="w-[130px] md:w-[185px] h-[40px] md:h-[50px] md:rounded-[6px]"
          >
            Дізнатися більше
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;
