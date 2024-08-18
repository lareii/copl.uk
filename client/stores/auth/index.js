import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: 'loading',
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
