import { create } from "zustand";

const useCaseStore = create((set) => ({
  cases: [],
  addCase: (newCase) =>
    set((state) => ({
      cases: [...state.cases, newCase],
    })),
  updateCase: (id, updates) =>
    set((state) => ({
      cases: state.cases.map((caseItem) =>
        caseItem.id === id ? { ...caseItem, ...updates } : caseItem
      ),
    })),
  deleteCase: (id) =>
    set((state) => ({
      cases: state.cases.filter((caseItem) => caseItem.id !== id),
    })),
  getCaseById: (id) => {
    return useCaseStore.getState().cases.find((c) => c.id === id);
  },
}));

export default useCaseStore;
