import { EventTypeMapper } from '@/app/(client)/schedule-importer/constants';

export const getEventColor = (eventType: string): string => {
  let res = '';
  for (const value of Object.values(EventTypeMapper)) {
    if (value.text === eventType) {
      res = value.color;
    }
  }
  return res;
};
