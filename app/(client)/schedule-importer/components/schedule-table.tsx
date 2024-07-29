import React, { FC } from 'react';

import ScheduleCard from '@/app/(client)/schedule-importer/components/schedule-card';
import { DAYS, TIMES } from '@/app/(client)/schedule-importer/constants';
import { ScheduleWeek } from '@/app/(client)/schedule-importer/types';
import { Event } from '@/types/event';

const days = ['Пн', 'Вв', 'Ср', 'Чт', 'Пт', 'Сб'];

interface ScheduleTableProps {
  eventsDays: ScheduleWeek[];
}

const ScheduleTable: FC<ScheduleTableProps> = ({ eventsDays }) => {
  const table: (Event[] | null)[][] = Array(TIMES.length)
    .fill(null)
    .map(() =>
      Array(days.length)
        .fill(null)
        .map(() => []),
    );

  eventsDays.forEach(({ day, pairs }) => {
    const dayIndex = days.indexOf(day);
    pairs.forEach(pair => {
      const normalizedTime = pair.time.replace('.', ':');
      const timeIndex = TIMES.indexOf(normalizedTime);
      if (dayIndex !== -1 && timeIndex !== -1) {
        table[timeIndex][dayIndex]?.push(pair);
      }
    });
  });

  return (
    <table className="w-full border-separate border-spacing-x-[2px]">
      <thead>
        <tr className="w-full min-h-[120px] max-h-[120px]">
          <th></th>
          {days.map((day, index) => (
            <th
              className="text-left text-p font-semibold border-b border-white border-dashed pb-[10px]"
              key={day}
            >
              {DAYS[index]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TIMES.map((time, rowIndex) => (
          <tr className="h-[180px]" key={time}>
            <td className="align-text-top text-p pr-[30px]">{time}</td>
            {table[rowIndex].map((pairs, colIndex) => (
              <td
                className="min-w-[184px] max-w-[260px] align-top pr-[30px] border-b border-white border-dashed pb-[10px]"
                key={colIndex}
              >
                {pairs?.map((pair, index) => (
                  <div key={index} className="mb-[2px]">
                    <ScheduleCard event={pair} />
                  </div>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
