'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getPairs } from '@/app/actions/schedule.actions';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';
import { useScheduleStore } from '@/store/schedule-store';

export default function ImportPage() {
  const router = useRouter();
  const { groupId, groupName, course } = useScheduleStore();
  const { toast } = useToast();

  async function createScheduleRequest(
    groupName: string,
    groupId: string,
    courseIdentifier: string,
  ) {
    const events = await getPairs(groupName, groupId);
    await api.post('/schedule/create', {
      groupName,
      courseIdentifier,
      scheduleFirstWeek: events.scheduleFirstWeek,
      scheduleSecondWeek: events.scheduleSecondWeek,
    });
  }

  useEffect(() => {
    if (groupName !== '' && groupId !== '' && course !== '') {
      createScheduleRequest(groupName, groupId, course)
        .then(() => {
          toast({
            variant: 'default',
            title: 'Розклад успішно створено',
          });
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            title: 'Помилка створення розкладу',
          });
        });
      router.push('/schedule-importer');
    }
  }, [course, groupId, groupName, router, toast]);

  return (
    <div className="flex gap-[20px] flex-col items-center pt-[20px] lg:pt-[40px]">
      <h1 className="text-xl lg:text-2xl text-center px-3 font-semibold my-8">
        Розклад завантажується. Будь ласка, зачекайте
      </h1>
    </div>
  );
}
