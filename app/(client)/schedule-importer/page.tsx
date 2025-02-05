import { Suspense } from 'react';

import Schedule from '@/app/(client)/schedule-importer/components/schedule';
import ScheduleTable from '@/app/(client)/schedule-importer/components/schedule-table';
import {
  EventsData,
  EventsResponse,
  GroupsResponse,
} from '@/app/(client)/schedule-importer/types';
import Spinner from '@/components/ui/spinner';
import { campusApi } from '@/lib/api';

export default async function ScheduleImporter({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) {
  let eventsData: EventsData | null = null;
  const { id, name } = await params;
  const { data: groups } =
    await campusApi.get<GroupsResponse>('/schedule/groups');

  const isGroupSelected = id && name;
  if (isGroupSelected) {
    const { data: eventsResponse } = await campusApi.get<EventsResponse>(
      '/schedule/lessons',
      {
        params: {
          groupName: name,
          groupId: id,
        },
      },
    );
    eventsData = eventsResponse?.data;
  }

  return (
    <div className="flex gap-[20px] flex-col items-center pt-[20px] lg:pt-[40px]">
      <Suspense fallback={<Spinner />}>
        <Schedule groups={groups.data} />
      </Suspense>
      {eventsData ? (
        <Suspense fallback={<Spinner />}>
          <ScheduleTable eventsData={eventsData} />
        </Suspense>
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
