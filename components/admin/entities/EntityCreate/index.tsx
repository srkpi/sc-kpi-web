import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface EntityCreateProps {
  onCreate: (name: string) => Promise<void>;
  placeholder?: string;
  buttonText?: string;
}

const EntityCreate = ({
  onCreate,
  placeholder = 'Введіть назву',
  buttonText = 'Додати',
}: EntityCreateProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const handleAdd = async () => {
    if (!value) return;
    await onCreate(value);
    setValue('');
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <input
        className="text-xl flex-1 p-3 rounded-xl bg-transparent border border-blue disabled:border-greyBlue disabled:opacity-75 transition duration-500"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <div className="flex gap-2">
        <Button variant="default" className="w-36" onClick={handleAdd}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default EntityCreate;
