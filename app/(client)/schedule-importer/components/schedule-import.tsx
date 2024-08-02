import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  EventsData,
  ScheduleAuthResponse,
} from '@/app/(client)/schedule-importer/types';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface ScheduleImportProps {
  events: EventsData;
}

const ScheduleImport: FC<ScheduleImportProps> = ({ events }) => {
  const searchParams = useSearchParams();
  const handleImportSchedule = async () => {
    const { data } = await api.get<ScheduleAuthResponse>('/schedule/auth');
    const { authUrl } = data;
    window.location.href = authUrl;
    localStorage.setItem('schedule', JSON.stringify(events));
    localStorage.setItem('params', JSON.stringify(searchParams.toString()));
  };

  // const handleCreateSchedule = async () => {
  //   const scheduleCreateRequest: ScheduleCreateRequest = {
  //     groupName: 'IM-22',
  //     courseIdentifier: '4 курс',
  //     scheduleFirstWeek: events.scheduleFirstWeek,
  //     scheduleSecondWeek: events.scheduleSecondWeek,
  //   };
  //   try {
  //     const { data } = await api.post(
  //       '/schedule/create',
  //       scheduleCreateRequest,
  //     );
  //     console.log(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  //
  //   localStorage.removeItem('schedule');
  // };

  return (
    <div className="grid place-items-center gap-[20px] lg:gap-[30px] mt-[80px] lg:mt[50px] mb-[70px] px-[42px] md:px-[50px] lg:px-[64px] xl:px-[100px]">
      <p className="text-m-p lg:text-p font-semibold max-w-[576px] text-center">
        Приберіть непотрібні вам предмети, натиснувши на хрестик біля предмету.
        Натисніть на кнопку "Імпортувати розклад". Надайте застосунку необхідні
        дозволи. Насолоджуйтесь розкладом у Google Calendar.
      </p>
      <Button size="sm" onClick={handleImportSchedule}>
        Імпортувати розклад
      </Button>
    </div>
  );
};

export default ScheduleImport;
