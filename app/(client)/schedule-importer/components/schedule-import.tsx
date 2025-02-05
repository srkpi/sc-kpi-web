import { FC, useState } from 'react';
import { isAxiosError } from 'axios';

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
  const { groupName, course } = useScheduleStore();
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const handleImportSchedule = async () => {
    try {
      if (!groupName || !course) {
        toast({
          variant: 'destructive',
          title: 'Виберіть групу та курс',
        });
        return;
      }
      if (events) {
        try {
          const { data } =
            await api.get<ScheduleAuthResponse>('/schedule/auth');
          const { authUrl } = data;
          window.location.href = authUrl;
          setIsImporting(true);
          await api.post('/schedule/create', {
            groupName,
            courseIdentifier: course,
            scheduleFirstWeek: events.scheduleFirstWeek,
            scheduleSecondWeek: events.scheduleSecondWeek,
          });
          localStorage.removeItem('schedule');
          setIsImporting(false);
          toast({
            title: 'Розклад успішно імпортовано',
          });
        } catch (error) {
          if (isAxiosError(error)) {
            toast({
              variant: 'destructive',
              title: 'Помилка створення розкладу',
            });
          }
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Трапилась помилка',
        });
      }
    }
  };

  return (
    <div className="grid place-items-center gap-[20px] lg:gap-[30px] mt-[80px] lg:mt[50px] mb-[70px] px-[42px] md:px-[50px] lg:px-[64px] xl:px-[100px]">
      <Button size="sm" disabled={isImporting} onClick={handleImportSchedule}>
        {isImporting ? 'Імпортується...' : 'Імпортувати розклад'}
      </Button>
    </div>
  );
};

export default ScheduleImport;
