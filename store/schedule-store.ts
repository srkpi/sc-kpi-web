import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { WeekType } from '@/app/(client)/schedule-importer/types';

type ScheduleStore = {
  groupId: string;
  groupName: string;
  course: string;
  week: WeekType;
  setGroupId: (id: string) => void;
  setGroupName: (name: string) => void;
  setWeek: (week: WeekType) => void;
  setCourse: (course: string) => void;
};

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    set => ({
      groupId: '',
      groupName: '',
      week: 'first',
      course: '',
      setGroupId: (id: string) => set({ groupId: id }),
      setGroupName: (name: string) => set({ groupName: name }),
      setWeek: week => set({ week }),
      setCourse: (value: string) => set({ course: value }),
    }),
    {
      name: 'schedule-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
