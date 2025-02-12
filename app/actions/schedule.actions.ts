'use server';

import {
  EventsData,
  EventsResponse,
  ScheduleAuthResponse,
} from '@/app/(client)/schedule-importer/types';
import { campusApi } from '@/lib/campusApi';
import { apiClient } from '@/lib/client';
import { GroupsResponse } from '@/types/group';

export async function getGroups() {
  const { data: groups } = await campusApi<GroupsResponse>('/schedule/groups');
  return groups.data;
}

export async function getPairs(groupName: string, groupId: string) {
  const { data } = await campusApi.get<EventsResponse>('/schedule/lessons', {
    params: {
      groupName: groupName,
      groupId: groupId,
    },
  });
  return data.data;
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
