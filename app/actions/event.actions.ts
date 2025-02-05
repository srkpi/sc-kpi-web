import { apiClient } from '@/lib/client';
import { CalendarEvent } from '@/types/calendar-event';

export async function getEventList() {
  const res = await apiClient<CalendarEvent[]>('/calendar/event');
  return res.data;
}
