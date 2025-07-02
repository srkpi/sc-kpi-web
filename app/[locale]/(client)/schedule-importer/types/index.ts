import { ScheduleEvent } from '@/types/schedule-event';

export type WeekType = 'first' | 'second';

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
