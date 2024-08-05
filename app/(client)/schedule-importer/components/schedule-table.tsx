'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import ScheduleCard from '@/app/(client)/schedule-importer/components/schedule-card';
import ScheduleImport from '@/app/(client)/schedule-importer/components/schedule-import';
import {
  DAYS,
  DAYS_SHORT_FORM,
  TIMES,
} from '@/app/(client)/schedule-importer/constants';
import { EventsData, WeekType } from '@/app/(client)/schedule-importer/types';
import createEventsTable from '@/app/(client)/schedule-importer/utils/createEventsTable';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';
import { Event } from '@/types/event';

interface ScheduleTableProps {
  eventsData: EventsData;
}

const ScheduleTable: FC<ScheduleTableProps> = ({ eventsData }) => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const storedEvents =
    typeof window !== 'undefined' ? localStorage.getItem('schedule') : null;
  const [events, setEvents] = useState<EventsData>(
    storedEvents ? JSON.parse(storedEvents) : eventsData,
  );
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const thRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const week = searchParams.get('week') as WeekType;
  const scheduleWeek =
    week === 'first' ? events.scheduleFirstWeek : events.scheduleSecondWeek;
  const groupName = searchParams.get('name');
  const table = createEventsTable(scheduleWeek);

  useEffect(() => {
    const createSchedule = async () => {
      const groupName = searchParams.get('name');
      const courseIdentifier = sessionStorage.getItem('course');
      if (storedEvents && groupName && courseIdentifier) {
        try {
          setEvents(JSON.parse(storedEvents));
          await api.post('/schedule/create', {
            groupName,
            courseIdentifier,
            scheduleFirstWeek: events.scheduleFirstWeek,
            scheduleSecondWeek: events.scheduleSecondWeek,
          });
          localStorage.removeItem('schedule');
          toast({
            title: 'Розклад успішно імпортовано',
          });
        } catch (error) {
          if (isAxiosError(error)) {
            toast({
              title: 'Помилка створення розкладу',
            });
          }
        }
      }
    };
    createSchedule();
  }, []);

  useEffect(() => {
    if (!storedEvents) {
      setEvents(eventsData);
    }
  }, [groupName]);

  const handleDelete = (eventToDelete: Event) => {
    const updatedSchedule = scheduleWeek.map(({ day, pairs }) => ({
      day,
      pairs: pairs.filter(pair => pair !== eventToDelete),
    }));

    if (week === 'first') {
      setEvents({ ...events, scheduleFirstWeek: updatedSchedule });
    } else {
      setEvents({ ...events, scheduleSecondWeek: updatedSchedule });
    }
  };

  const handleChevronClick = (direction: 'left' | 'right') => {
    let newIndex = currentDayIndex;
    if (direction === 'left' && currentDayIndex > 0) {
      newIndex -= 1;
    } else if (
      direction === 'right' &&
      currentDayIndex < DAYS_SHORT_FORM.length - 1
    ) {
      newIndex += 1;
    }
    setCurrentDayIndex(newIndex);

    const scrollToElement = thRefs.current[newIndex];
    const containerElement = containerRef.current;

    if (scrollToElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect();
      const elementRect = scrollToElement.getBoundingClientRect();
      const offset = elementRect.left - containerRect.left - 45;
      containerElement.scrollBy({
        left: offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="overflow-x-auto max-w-full no-scrollbar"
      >
        <div className="absolute transform translate-y-[2px] w-full flex justify-between px-[14px] md:px-[32px] lg:px-[64px] lg:hidden">
          <ChevronLeft
            size={15}
            className="cursor-pointer"
            onClick={() => handleChevronClick('left')}
          />
          <ChevronRight
            size={15}
            className="cursor-pointer"
            onClick={() => handleChevronClick('right')}
          />
        </div>
        <table className="border-separate border-spacing-x-[2px] _container">
          <thead>
            <tr className="w-full min-h-[120px] max-h-[120px]">
              <th></th>
              {DAYS_SHORT_FORM.map((day, index) => (
                <th
                  ref={el => {
                    thRefs.current[index] = el;
                  }}
                  className="text-left text-m-p lg:text-p font-semibold border-b border-white border-dashed pb-[10px]"
                  key={day}
                >
                  {DAYS[index]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIMES.map((time, rowIndex) => (
              <tr className="h-[180px]" key={time}>
                <td className="sticky z-5 lg:static left-[14px] md:left-[32px] lg:left-[64px] align-text-top text-m-p lg:text-p font-semibold pr-[10px] sm:pr-[20px] lg:pr-[30px]">
                  {time}
                </td>
                {table[rowIndex].map((pairs, colIndex) => (
                  <td
                    className="min-w-[184px] z-0 max-w-[260px] h-fit align-top lg:align-top pr-[14px] lg:pr-[30px] border-b border-white border-dashed pb-0 lg:pb-[10px]"
                    key={colIndex}
                  >
                    {pairs?.map((pair, index) => (
                      <div key={index} className="mb-[2px]">
                        <ScheduleCard
                          event={pair}
                          onDelete={() => handleDelete(pair)}
                        />
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScheduleImport events={events} />
    </>
  );
};

export default ScheduleTable;
