import { Event } from '@/types/event';
import { Group } from '@/types/group';

export type WeekType = 'first' | 'second';

export interface GroupsResponse {
  paging: Paging;
  data: Group[];
}

export interface Paging {
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  firstItemOnPage: number;
  lastItemOnPage: number;
}

export interface EventsResponse {
  paging: Paging | null;
  data: EventsData;
}

export interface EventsData {
  groupCode: string;
  scheduleFirstWeek: ScheduleWeek[];
  scheduleSecondWeek: ScheduleWeek[];
}

export interface ScheduleWeek {
  day: string;
  pairs: Event[];
}
