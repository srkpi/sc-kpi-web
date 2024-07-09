import React from 'react';
import { ChevronRight } from 'lucide-react';

const ArrowRight = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} className="hover:scale-110 z-10">
      <ChevronRight size={30} className="hover:text-blue  transition" />
    </button>
  );
};

export default ArrowRight;
