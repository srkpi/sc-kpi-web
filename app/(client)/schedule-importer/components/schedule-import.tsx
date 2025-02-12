import { FC } from 'react';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { EventsData } from '@/app/(client)/schedule-importer/types';
import {
  importSchedule,
  oauthGoogleCalendar,
} from '@/app/actions/schedule.actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast/use-toast';
import { useScheduleStore } from '@/store/schedule-store';

interface ScheduleImportProps {
  events: EventsData;
}

const ScheduleImport: FC<ScheduleImportProps> = ({ events }) => {
  const { groupId, groupName, course } = useScheduleStore();
  const { toast } = useToast();
  const router = useRouter();
  const handleImportSchedule = async () => {
    if (!groupId || !groupName || !course) {
      toast({
        variant: 'destructive',
        title: 'Виберіть групу та курс',
      });
      return;
    }
    try {
      const authUrl = await oauthGoogleCalendar();
      router.push(authUrl);
      await importSchedule(groupName, course, events);
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
