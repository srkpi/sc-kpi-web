import Schedule from '@/app/(client)/schedule-importer/components/schedule';
import ScheduleTable from '@/app/(client)/schedule-importer/components/schedule-table';
import {
  EventsData,
  EventsResponse,
  GroupsResponse,
  WeekType,
} from '@/app/(client)/schedule-importer/types';
import { campusApi } from '@/lib/api';

export default async function ScheduleImporter({
  searchParams,
}: {
  searchParams: Promise<{ id: string; name: string; week: WeekType }>;
}) {
  let eventsData: EventsData | null = null;
  const { data: groups } =
    await campusApi.get<GroupsResponse>('/schedule/groups');

  const resolvedSearchParams = await searchParams;
  const isGroupSelected = resolvedSearchParams.id && resolvedSearchParams.name;
  if (isGroupSelected) {
    const { data: eventsResponse } = await campusApi.get<EventsResponse>(
      '/schedule/lessons',
      {
        params: {
          groupName: resolvedSearchParams.name,
          groupId: resolvedSearchParams.id,
        },
      },
    );
    eventsData = eventsResponse?.data;
  }

  return (
    <div className="flex gap-[20px] flex-col items-center pt-[20px] lg:pt-[40px]">
      <Schedule groups={groups.data} />
      {eventsData ? (
        <ScheduleTable eventsData={eventsData} />
      ) : (
        <p className="max-w-[500px] text-center text-m-p md:text-p px-[24px]">
          Виберіть групу у випадаючому списку. Надайте застосунку необхідні
          дозволи, та через декілька хвилин насолоджуйтесь розкладом у Google
          Calendar
        </p>
      )}
    </div>
  );
}
