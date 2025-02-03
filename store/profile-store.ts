import { create } from 'zustand';

type ProfileStore = {
  isProfileMenuActive: boolean;
  setIsProfileMenuActive: (isActive: boolean) => void;
};

export const useProfileStore = create<ProfileStore>(set => ({
  isProfileMenuActive: true,
  setIsProfileMenuActive: isActive => {
    set({ isProfileMenuActive: isActive });
  },
}));
