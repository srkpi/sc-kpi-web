import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Department } from '@/types/departments';

interface ClubCardProps {
  club: Department;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const { id, name, category, description, image, buttonLink } = club;
  return (
    <div className="p-6 rounded-lg shadow-lg">
      <span className="font-m-button text-blue">{category}</span>
      <div className="">
        <div className="w-full h-[300px] md:h-[338px] bg-muted rounded-lg flex items-center justify-center">
          <img
            src={image || '/placeholder.png'}
            alt={name}
            className="w-[290px] h-[300px] md:w-[408px] md:h-[338px] object-cover rounded-lg"
          />
        </div>
        <h2 className="font-m-h1 md:font-h3 mt-4">{name}</h2>
        <p className="font-p md:font-m-p mt-2">{description}</p>
        <div className="flex justify-between mt-4 space-x-0 md:space-x-4">
          <Link href={`${buttonLink}`}>
            <Button
              variant="default"
              className="w-[130px] h-[40px] md:w-[180px] md:h-[35px]"
            >
              Долучитися
            </Button>
          </Link>
          <Link href={`/clubs/${id}`}>
            <Button
              variant="outline"
              className="w-[130px] h-[40px] md:w-[180px] md:h-[35px]"
            >
              Дізнатися більше
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
