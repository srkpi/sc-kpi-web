'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

import {
  createStatus,
  deleteStatus,
  updateStatus,
} from '@/app/actions/statuses.actions';
import EntityCreate from '@/components/admin/entities/EntityCreate';
import EntityItem from '@/components/admin/entities/EntityItem';
import { Input } from '@/components/ui/input';
import { Status } from '@/types/status';

interface Props {
  statuses: Status[];
}

export default function StatussPage({ statuses }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredStatuss = statuses.filter(status =>
    status.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <h1 className="text-h1 font-semibold mb-8">Статуси</h1>
      <Input
        className="w-full text-p pl-16 mb-4"
        placeholder="Пошук..."
        value={searchQuery}
        onChange={handleSearchChange}
        icon={<Search />}
        iconPosition="start"
      />

      <div className="flex flex-col w-full gap-2">
        {filteredStatuss.map(status => (
          <EntityItem
            id={status.id}
            name={status.name}
            onUpdate={updateStatus}
            onDelete={deleteStatus}
            key={status.id}
          />
        ))}
      </div>

      <div className="w-[90%] mx-auto my-5 rounded-full border-t border-greyBlue"></div>

      <EntityCreate onCreate={createStatus} />
    </>
  );
}
