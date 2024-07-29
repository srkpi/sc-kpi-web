'use client';

import { FC, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import GroupsDropdown from '@/app/(client)/schedule-importer/components/groups-dropdown';
import { WeekType } from '@/app/(client)/schedule-importer/types';
import { Button } from '@/components/ui/button';
import { Group } from '@/types/group';

interface ScheduleProps {
  groups: Group[];
}

const Schedule: FC<ScheduleProps> = ({ groups }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialGroup = groups.find(
    group => group.id === searchParams.get('id'),
  );
  const [group, setGroup] = useState(initialGroup || null);
  const week = (searchParams.get('week') || 'first') as WeekType;
  const groupId = searchParams.get('id');
  const groupName = searchParams.get('name');

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-m-h1 lg:text-h1 font-semibold mb-[30px]">
        Імпортер розкладу занять КПІ
      </h1>
      <div className="flex mb-[30px]">
        <Button
          variant={week === 'first' ? 'default' : 'outline'}
          style={{ borderRadius: '6px 0px 0px 6px' }}
          size="sm"
          onClick={() => {
            router.replace(
              `${pathname}?id=${groupId}&name=${groupName}&week=first`,
            );
          }}
        >
          Перший тиждень
        </Button>
        <Button
          variant={week === 'second' ? 'default' : 'outline'}
          style={{ borderRadius: '0px 6px 6px 0px' }}
          size="sm"
          onClick={() => {
            router.replace(
              `${pathname}?id=${groupId}&name=${groupName}&week=second`,
            );
          }}
        >
          Другий тиждень
        </Button>
      </div>
      <GroupsDropdown
        week={week}
        groups={groups}
        group={group}
        setGroup={setGroup}
      />
    </div>
  );
};

export default Schedule;
