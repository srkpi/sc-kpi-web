import Schedule from '@/app/(client)/schedule-importer/components/schedule';
import ScheduleTable from '@/app/(client)/schedule-importer/components/schedule-table';
import {
  EventsResponse,
  GroupsResponse,
  ScheduleWeek,
  WeekType,
} from '@/app/(client)/schedule-importer/types';
import { campusApi } from '@/lib/api';

export default async function ScheduleImporter({
  searchParams,
}: {
  searchParams: { id: string; name: string; week: WeekType };
}) {
  let eventsDays: ScheduleWeek[] = [];
  const { data: groups } =
    await campusApi.get<GroupsResponse>('/schedule/groups');

  const isGroupSelected = searchParams.id && searchParams.name;
  if (isGroupSelected) {
    const { data: eventsResponse } = await campusApi.get<EventsResponse>(
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
      eventsDays = eventsData.scheduleFirstWeek as ScheduleWeek[];
    } else {
      eventsDays = eventsData.scheduleSecondWeek as ScheduleWeek[];
    }
  }

  return (
    <div className="flex min-h-screen gap-[20px] flex-col items-center pt-[20px] lg:pt-[40px]">
      <Schedule groups={groups.data} />
      {eventsDays.length > 0 ? (
        <ScheduleTable eventsDays={eventsDays} />
      ) : (
        <p className="max-w-[500px] text-center px-[24px]">
          Виберіть групу у випадаючому списку. Надайте застосунку необхідні
          дозволи, та через декілька хвилин насолоджуйтесь розкладом у Google
          Calendar
        </p>
      )}
    </div>
  );
}
