'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import ScheduleCard from '@/app/(client)/schedule-importer/components/schedule-card';
import ScheduleImport from '@/app/(client)/schedule-importer/components/schedule-import';
import {
  DAYS,
  DAYS_SHORT_FORM,
  TIMES,
} from '@/app/(client)/schedule-importer/constants';
import { EventsData } from '@/app/(client)/schedule-importer/types';
import createEventsTable from '@/app/(client)/schedule-importer/utils/createEventsTable';
import { getPairs } from '@/app/actions/schedule.actions';
import { useScheduleStore } from '@/store/schedule-store';
import { ScheduleEvent } from '@/types/schedule-event';

const ScheduleTable = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [events, setEvents] = useState<EventsData>({
    groupCode: '',
    scheduleFirstWeek: [],
    scheduleSecondWeek: [],
  });

  const thRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { groupId, groupName, week } = useScheduleStore();

  const scheduleWeek =
    week === 'first' ? events?.scheduleFirstWeek : events?.scheduleSecondWeek;

  const table = createEventsTable(scheduleWeek!);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getPairs(groupName, groupId);
      setEvents(events);
    };
    if (groupId && groupName) {
      fetchEvents();
    }
  }, [groupId, groupName]);

  const handleDelete = (eventToDelete: ScheduleEvent) => {
    const updatedSchedule = scheduleWeek?.map(({ day, pairs }) => ({
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
