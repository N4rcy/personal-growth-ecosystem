import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCaseStore = create(
  persist(
    (set, get) => ({
      cases: [],
      
      addCase: (newCase) => {
        set((state) => ({ 
          cases: [...state.cases, newCase] 
        }));
        console.log('Case added:', newCase);
      },
      
      updateCase: (id, updates) =>
        set((state) => ({
          cases: state.cases.map(caseItem =>
            caseItem.id === id ? { ...caseItem, ...updates } : caseItem
          )
        })),
        
      deleteCase: (id) =>
        set((state) => ({
          cases: state.cases.filter(caseItem => caseItem.id !== id)
        })),
        
      getCaseById: (id) => {
        const caseItem = get().cases.find(c => c.id === id);
        console.log('Store cases:', get().cases);
        console.log('Looking for case ID:', id, 'Found:', caseItem);
        return caseItem;
      }
    }),
    {
      name: 'case-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useCaseStore;
