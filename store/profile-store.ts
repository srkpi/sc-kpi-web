import { create } from 'zustand';

import { IUser } from '@/types/auth/user.interface';

type ProfileStore = {
  userData: IUser | null;
  setUserData: (data: IUser) => void;
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
