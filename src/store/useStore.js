import { create } from "zustand";

const useStore = create((set) => ({
  teamName: "",
  keywords: [],
  place: "",
  setTeamName: (teamName) => set({ teamName }),
  setKeywords: (keyword) =>
    set((state) => ({
      keywords: state.keywords.includes(keyword)
        ? state.keywords.filter((k) => k !== keyword) // 이미 선택된 경우 제거
        : [...state.keywords, keyword],               // 선택되지 않은 경우 추가
    })),
  setPlace: (place) => set({ place }),
}));

export default useStore;


