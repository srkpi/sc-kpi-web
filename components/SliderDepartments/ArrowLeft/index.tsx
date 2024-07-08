import React from 'react';
import { ChevronLeft } from 'lucide-react';

const ArrowLeft = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} className="hover:scale-110">
      <ChevronLeft size={30} className="hover:text-blue  transition" />
    </button>
  );
};

export default ArrowLeft;
