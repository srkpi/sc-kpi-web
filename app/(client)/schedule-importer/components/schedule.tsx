'use client';

import { useState } from 'react';

import ScheduleCard from '@/app/(client)/schedule-importer/components/schedule-card';
import { WeekType } from '@/app/(client)/schedule-importer/types';
import { Button } from '@/components/ui/button';

const Schedule = () => {
  const [week, setWeek] = useState<WeekType | null>(null);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-m-h1 lg:text-h1 font-semibold mb-[30px]">
        Імпортер розкладу занять КПІ
      </h1>
      <div className="flex">
        <Button
          variant={week === 'first' ? 'default' : 'outline'}
          style={{ borderRadius: '6px 0px 0px 6px' }}
          onClick={() => setWeek('first')}
          size="sm"
        >
          Перший тиждень
        </Button>
        <Button
          variant={week === 'second' ? 'default' : 'outline'}
          style={{ borderRadius: '0px 6px 6px 0px' }}
          onClick={() => setWeek('second')}
          size="sm"
        >
          Другий тиждень
        </Button>
      </div>
      <div className="mt-[20px]">
        <ScheduleCard
          event={{
            name: 'Event Event Event Event Event Event Event Event Event',
            type: 'LECTURE',
            startDate: new Date(),
            endDate: new Date(),
            teacherName: 'Teacher Name',
            id: '1231',
          }}
        />
      </div>
    </div>
  );
};

export default Schedule;
