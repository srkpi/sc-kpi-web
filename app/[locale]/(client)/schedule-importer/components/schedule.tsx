'use client';

import { FC } from 'react';

import CoursesDropdown from '@/app/[locale]/(client)/schedule-importer/components/courses-dropdown';
import { GroupsDropdown } from '@/app/[locale]/(client)/schedule-importer/components/groups-dropdown';
import { WeekType } from '@/app/[locale]/(client)/schedule-importer/types';
import { Button } from '@/components/ui/button';
import { useScheduleStore } from '@/store/schedule-store';
import { Group } from '@/types/group';

interface ScheduleProps {
  groups: Group[];
}

const Schedule: FC<ScheduleProps> = ({ groups }) => {
  const { week, setWeek } = useScheduleStore();

  const handleWeekChange = (selectedWeek: WeekType) => {
    setWeek(selectedWeek);
  };

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
        <GroupsDropdown groups={groups} />
        <CoursesDropdown />
      </div>
    </div>
  );
};

export default Schedule;
