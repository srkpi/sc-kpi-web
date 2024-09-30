'use client';
import React, { useMemo, useState } from 'react';
import { SortAsc, SortDesc } from 'lucide-react';
import useSWR from 'swr';

import Event from '@/app/(client)/events/_components/event';
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
import { useToast } from '@/components/ui/toast/use-toast';
import { axiosFetcher } from '@/lib/swr/fetcher';

enum SortBy {
  Time = 'Час',
  Name = 'Назва',
}

interface IEvent {
  id: number;
  title: string;
  shortDescription: string;
  location: string;
  tag: string;
  startDate: string;
  endDate: string;
}

const EventCalendar = () => {
  const [isDesc, setIsDesc] = useState(false);
  const [filterKey, setFilterKey] = useState('');
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [focused, setFocused] = useState(false);
  const { toast } = useToast();

  const { data: events, error } = useSWR<IEvent[]>(
    '/calendar/event',
    axiosFetcher,
    {
      revalidateOnFocus: false,
    },
  );

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
  }, [filterKey, events, sortBy, isDesc]);
  if (error) {
    toast({
      variant: 'destructive',
      title: 'Трапилась помилка',
      description: error,
    });
    return (
      <div className="_container text-center flex items-center justify-center min-h-[200px] text-m-h1 text-blue md:text-h1 font-semibold">
        Не вдалося завантажити заходи
      </div>
    );
  }
  if (!events)
    return (
      <div className="_container text-center flex items-center justify-center min-h-[200px] text-m-h1 text-blue md:text-h1 font-semibold">
        Завантаження заходів...
      </div>
    );

  return (
    <div className="_container sm:mt-5 lg:mt-0 flex flex-col gap-5 md:gap-10 mb-12">
      <h1 className="font-semibold text-m-h1 md:text-h1">Розклад заходів</h1>
      <div className="flex flex-wrap gap-5">
        <div className="max-w-[408px] flex-auto">
          <Command
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="bg-transparent relative overflow-visible"
          >
            <CommandInput
              placeholder="Пошук"
              value={filterKey}
              customContainerClasses="border-white rounded-1 md:rounded-[6px] max-h-[30px] md:max-h-12"
              onValueChange={setFilterKey}
            />
            <CommandList
              className={`mt-[5px] bg-dark border-white border-[1px] no-scrollbar rounded-b-[10px] max-h-[35vh] absolute w-full top-full ${!focused && 'hidden'} z-10`}
            >
              <CommandEmpty className="bg-dark p-2 text-m-p md:text-p">
                захід не знайдено
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
                        setFocused(false);
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
        className="grid gap-[10px] sm:gap-5 md:gap-[28px]"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        }}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <Event
              key={event.id}
              title={event.title}
              shortDescription={event.shortDescription}
              location={event.location}
              tag={event.tag}
              startDate={event.startDate}
              endDate={event.endDate}
            />
          ))
        ) : (
          <div>Немає результатів</div>
        )}
      </div>
    </div>
  );
};
export default EventCalendar;
