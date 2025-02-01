import { create } from 'zustand';

import { User } from '@/types/auth/user';

type ProfileStore = {
  userData: User | null;
  setUserData: (data: User) => void;
  isProfileMenuActive: boolean;
  setIsProfileMenuActive: (isActive: boolean) => void;
};

export const useProfileStore = create<ProfileStore>(set => ({
  userData: null,
  isProfileMenuActive: true,
  setUserData: data => {
    set({ userData: data });
  },
  setIsProfileMenuActive: isActive => {
    set({ isProfileMenuActive: isActive });
  },
}));
