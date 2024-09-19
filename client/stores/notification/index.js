import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notificationCount: 0,
  setNotificationCount: (notificationCount) => set({ notificationCount }),
}));