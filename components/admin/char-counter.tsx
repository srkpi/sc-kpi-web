import { FC } from 'react';

interface CharCounterProps {
  length: number;
  max: number;
}

const CharCounter: FC<CharCounterProps> = ({ length, max }) => (
  <p
    className={length > max ? 'text-sm text-red-500' : 'text-sm text-greyBlue'}
  >
    {length}/{max}
  </p>
);

export default CharCounter;
