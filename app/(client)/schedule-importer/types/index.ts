import { Group } from '@/types/group';
import { ScheduleEvent } from '@/types/schedule-event';

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
  pairs: ScheduleEvent[];
}

export interface ScheduleAuthResponse {
  authUrl: string;
}

export interface ScheduleCreateRequest {
  groupName: string;
  courseIdentifier: string;
  scheduleFirstWeek: ScheduleWeek[];
  scheduleSecondWeek: ScheduleWeek[];
}
