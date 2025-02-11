import { Suspense } from 'react';

import Schedule from '@/app/(client)/schedule-importer/components/schedule';
import ScheduleTable from '@/app/(client)/schedule-importer/components/schedule-table';
import Spinner from '@/components/ui/spinner';
import { campusApi } from '@/lib/api';
import { GroupsResponse } from '@/types/group';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { data: groups } =
    await campusApi.get<GroupsResponse>('/schedule/groups');

  return (
    <div className="flex gap-[20px] flex-col items-center pt-[20px] lg:pt-[40px]">
      <Suspense fallback={<Spinner />}>
        <Schedule groups={groups.data} />
      </Suspense>
      <p className="max-w-[750px] text-center text-m-p md:text-p px-[24px]">
        Виберіть групу у випадаючому списку. Приберіть непотрібні вам предмети,
        натиснувши на хрестик біля предмету. Натисніть на кнопку "Імпортувати
        розклад". Надайте застосунку необхідні дозволи, та через декілька хвилин
        насолоджуйтесь розкладом у Google Calendar.
      </p>
      <ScheduleTable />
    </div>
  );
}
