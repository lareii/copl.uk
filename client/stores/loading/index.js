import { create } from 'zustand';

export const useLoadingStore = create((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
}));

export default useLoadingStore;
