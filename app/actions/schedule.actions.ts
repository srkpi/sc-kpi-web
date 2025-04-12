'use server';

import {
  EventsData,
  ScheduleAuthResponse,
} from '@/app/(client)/schedule-importer/types';
import { campusApi } from '@/lib/campusApi';
import { apiClient } from '@/lib/client';
import { Group } from '@/types/group';

export async function getGroups() {
  const { data: groups } = await campusApi<Group[]>('/schedule/groups');
  return groups;
}

export async function getPairs(groupName: string, groupId: string) {
  const { data } = await campusApi.get<EventsData>('/schedule/lessons', {
    params: {
      groupName: groupName,
      groupId: groupId,
    },
  });
  return data;
}

export async function oauthGoogleCalendar() {
  const { data } = await apiClient.get<ScheduleAuthResponse>('/schedule/auth');
  return data.authUrl;
}

export async function importSchedule(
  groupName: string,
  courseIdentifier: string,
  events: EventsData,
): Promise<void> {
  await apiClient.post('/schedule/create', {
    groupName,
    courseIdentifier,
    scheduleFirstWeek: events.scheduleFirstWeek,
    scheduleSecondWeek: events.scheduleSecondWeek,
  });

  //TODO: After success import - redirect user to success page
}
