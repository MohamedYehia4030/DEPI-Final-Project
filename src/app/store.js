import { create } from 'zustand';

const useAppStore = create((set) => ({
  isAuthModalOpen: false,
  authView: null,
  
  openAuthModal: (view) => set({ isAuthModalOpen: true, authView: view }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}));


export default useAppStore;