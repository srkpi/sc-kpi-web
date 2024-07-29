import Schedule from '@/app/(client)/schedule-importer/components/schedule';
import {
  EventsResponse,
  GroupsResponse,
  WeekType,
} from '@/app/(client)/schedule-importer/types';
import { campusApi } from '@/lib/api';
import { Event } from '@/types/event';

export default async function ScheduleImporter({
  searchParams,
}: {
  searchParams: { id: string; name: string; week: WeekType };
}) {
  let events: Event[] = [];
  const { data: groups } =
    await campusApi.get<GroupsResponse>('/schedule/groups');

  if (searchParams.name && searchParams.id) {
    let { data: eventsResponse } = await campusApi.get<EventsResponse>(
      '/schedule/lessons',
      {
        params: {
          groupName: searchParams.name,
          groupId: searchParams.id,
        },
      },
    );
    const eventsData = eventsResponse?.data;
    if (searchParams.week === 'first') {
      events = eventsData.scheduleFirstWeek?.at(0)?.pairs as Event[];
    } else {
      events = eventsData.scheduleSecondWeek?.at(0)?.pairs as Event[];
    }
  }

  console.log(events);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between pt-[20px] lg:pt-[40px]">
      <Schedule groups={groups.data} events={events} />
    </div>
  );
}
