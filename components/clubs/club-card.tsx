// components/ClubCard.tsx

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
      <div className="mt-4">
        <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
          {}
          <img
            src={image || '/placeholder.png'}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h2 className="font-h3 mt-4">{name}</h2>
        <p className="font-p mt-2">{description}</p>
        <div className="flex space-x-4 mt-4">
          <Link href={`${buttonLink}`}>
            <Button variant="default" className="w-[180px] h-[35px]">
              Долучитися
            </Button>
          </Link>
          <Link href={`/clubs/${id}`}>
            <Button variant="outline" className="w-[180px] h-[35px]">
              Дізнатися більше
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
