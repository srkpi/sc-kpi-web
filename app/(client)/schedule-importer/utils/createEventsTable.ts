import {
  DAYS_SHORT_FORM,
  TIMES,
} from '@/app/(client)/schedule-importer/constants';
import { ScheduleWeek } from '@/app/(client)/schedule-importer/types';
import { ScheduleEvent } from '@/types/schedule-event';

const createEventsTable = (scheduleWeek: ScheduleWeek[]) => {
  const table: (ScheduleEvent[] | null)[][] = Array(TIMES.length)
    .fill(null)
    .map(() =>
      Array(DAYS_SHORT_FORM.length)
        .fill(null)
        .map(() => []),
    );

  scheduleWeek.forEach(({ day, pairs }) => {
    const dayIndex = DAYS_SHORT_FORM.indexOf(day);
    pairs.forEach(pair => {
      const normalizedTime = pair.time.replace('.', ':');
      const timeIndex = TIMES.indexOf(normalizedTime);
      if (dayIndex !== -1 && timeIndex !== -1) {
        table[timeIndex][dayIndex]?.push(pair);
      }
    });
  });

  return table;
};

export default createEventsTable;
