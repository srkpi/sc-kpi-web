'use client';

import { FC, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CoursesDropdown from '@/app/(client)/schedule-importer/components/courses-dropdown';
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
  const week = searchParams.get('week') as WeekType;
  const groupId = searchParams.get('id');
  const groupName = searchParams.get('name');

  const handleWeekChange = (week: WeekType) => {
    if (!groupId || !groupName) return;
    router.replace(`${pathname}?id=${groupId}&name=${groupName}&week=${week}`);
  };

  useEffect(() => {
    const selectedParams = localStorage.getItem('params');
    if (selectedParams) {
      router.replace(`${pathname}?${JSON.parse(selectedParams)}`);
      localStorage.removeItem('params');
    }
  }, []);

  return (
    <div className="flex flex-col px-[20px] sm:px-[50px] lg:px-[100px] justify-center items-center">
      <h1 className="text-m-h1 lg:text-h1 font-semibold mb-[30px]">
        Імпортер розкладу занять КПІ
      </h1>
      <div className="flex mb-[30px]">
        <Button
          variant={week === 'first' ? 'default' : 'outline'}
          style={{ borderRadius: '6px 0px 0px 6px' }}
          size="sm"
          onClick={() => handleWeekChange('first')}
        >
          Перший тиждень
        </Button>
        <Button
          variant={week === 'second' ? 'default' : 'outline'}
          style={{ borderRadius: '0px 6px 6px 0px' }}
          size="sm"
          onClick={() => handleWeekChange('second')}
        >
          Другий тиждень
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-[10px]">
        <GroupsDropdown
          week={week}
          groups={groups}
          group={group}
          setGroup={setGroup}
        />
        <CoursesDropdown />
      </div>
    </div>
  );
};

export default Schedule;
