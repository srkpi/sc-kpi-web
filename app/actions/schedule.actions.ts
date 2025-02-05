import { EventsData } from '@/app/(client)/schedule-importer/types';
import { api } from '@/lib/api';

export async function importSchedule(
  groupName: string,
  courseIdentifier: string,
  events: EventsData,
): Promise<void> {
  await api.post('/schedule/create', {
    groupName,
    courseIdentifier,
    scheduleFirstWeek: events.scheduleFirstWeek,
    scheduleSecondWeek: events.scheduleSecondWeek,
  });
}
