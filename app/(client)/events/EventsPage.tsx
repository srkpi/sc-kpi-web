'use client';
import React, { FC, useMemo, useState } from 'react';
import { SortAsc, SortDesc } from 'lucide-react';

import EventCard from '@/app/(client)/events/event-card';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { CalendarEvent } from '@/types/calendar-event';

enum SortBy {
  Time = 'Час',
  Name = 'Назва',
}

interface Props {
  events: CalendarEvent[];
}

export const EventsPage: FC<Props> = ({ events }) => {
  const [isDesc, setIsDesc] = useState(false);
  const [filterKey, setFilterKey] = useState('');
  const [sortBy, setSortBy] = useState<SortBy | null>(null);

  const filteredEvents = useMemo(() => {
    let filtered = events || [];

    if (filterKey) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(filterKey.toLowerCase()),
      );
    }

    if (sortBy === SortBy.Time) {
      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return isDesc ? dateB - dateA : dateA - dateB;
      });
    } else if (sortBy === SortBy.Name) {
      filtered = filtered.sort((a, b) => {
        return isDesc
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      });
    }

    return filtered;
  }, [filterKey, sortBy, isDesc]);

  return (
    <>
      <div className="flex flex-wrap gap-5">
        <div className="max-w-[408px] flex-auto">
          <Command className="bg-transparent relative overflow-visible focus-within:!overflow-visible">
            <CommandInput
              placeholder="Пошук"
              value={filterKey}
              customContainerClasses="border-white rounded-1 md:rounded-[6px] max-h-[30px] md:max-h-12"
              onValueChange={setFilterKey}
            />
            <CommandList className="mt-[5px] bg-dark border-white border-[1px] no-scrollbar rounded-b-[10px] max-h-[35vh] absolute w-full top-full hidden focus-within:block z-10">
              <CommandEmpty className="bg-dark p-2 text-m-p md:text-p">
                Результатів не знайдено
              </CommandEmpty>
              <CommandGroup>
                {filteredEvents
                  .filter(
                    (event, index, self) =>
                      index === self.findIndex(e => e.title === event.title),
                  )
                  .slice(0, 3)
                  .map(event => (
                    <CommandItem
                      key={event.id}
                      value={event.title}
                      className="py-1 md:py-3"
                      onSelect={() => {
                        setFilterKey(event.title);
                      }}
                    >
                      {event.title}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div className="flex gap-5 max-h-[30px] md:max-h-12">
          <Select onValueChange={(value: string) => setSortBy(value as SortBy)}>
            <SelectTrigger className="border-white h-full rounded-2 md:rounded-[10px] gap-6">
              {sortBy ?? 'Сортувати за'}
            </SelectTrigger>
            <SelectContent>
              {Object.values(SortBy).map(sortValue => (
                <SelectItem key={sortValue} value={sortValue}>
                  {sortValue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {sortBy && (
            <Button
              onClick={() => setIsDesc(!isDesc)}
              variant="outline"
              size="sm"
              className="border-white rounded-2 md:rounded-[14px] px-0 md:px-2 h-full"
            >
              {isDesc ? (
                <SortAsc size={35} className="h-[20px] md:h-[35px]" />
              ) : (
                <SortDesc size={35} className="h-[20px] md:h-[35px]" />
              )}
            </Button>
          )}
        </div>
      </div>
      <div
        className="grid gap-[10px] mt-5 sm:gap-5 md:gap-[28px]"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        }}
      >
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            title={event.title}
            shortDescription={event.shortDescription}
            location={event.location}
            tag={event.tag}
            startDate={event.startDate}
            endDate={event.endDate}
          />
        ))}
      </div>
    </>
  );
};
