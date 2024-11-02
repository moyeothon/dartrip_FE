import { create } from "zustand";

const useStore = create((set) => ({
  teamName: "",
  keywords: [],
  place: "",
  setTeamName: (teamName) => set({ teamName }),
  setKeywords: (keyword) =>
    set((state) => ({
      keywords: [...state.keywords, keyword],
    })),
  setPlace: (place) => set({ place }),
}));

export default useStore;
