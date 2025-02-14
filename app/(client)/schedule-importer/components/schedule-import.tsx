import { FC } from 'react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import {
  EventsData,
  ScheduleAuthResponse,
} from '@/app/(client)/schedule-importer/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';
import { useScheduleStore } from '@/store/schedule-store';

interface ScheduleImportProps {
  events: EventsData;
}

const ScheduleImport: FC<ScheduleImportProps> = ({ events }) => {
  const { groupId, groupName, course: courseIdentifier } = useScheduleStore();
  const { toast } = useToast();
  const router = useRouter();
  const handleImportSchedule = async () => {
    if (!groupId || !groupName || !courseIdentifier) {
      toast({
        variant: 'destructive',
        title: 'Виберіть групу та курс',
      });
      return;
    }
    try {
      // const authUrl = await oauthGoogleCalendar();
      const { data } = await api.get<ScheduleAuthResponse>('/schedule/auth');
      router.push(data.authUrl);
      await api.post('/schedule/create', {
        groupName,
        courseIdentifier,
        scheduleFirstWeek: events.scheduleFirstWeek,
        scheduleSecondWeek: events.scheduleSecondWeek,
      });
      // await importSchedule(groupName, courseIdentifier, events);
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Помилка створення розкладу',
        });
      }
    }
  };

  return (
    <div className="grid place-items-center gap-[20px] lg:gap-[30px] mt-[80px] lg:mt[50px] mb-[70px] px-[42px] md:px-[50px] lg:px-[64px] xl:px-[100px]">
      <Button size="sm" disabled={!groupId} onClick={handleImportSchedule}>
        Імпортувати розклад
      </Button>
    </div>
  );
};

export default ScheduleImport;
