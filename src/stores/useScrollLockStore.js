import { create } from 'zustand';

const useScrollLockStore = create((set) => ({
    isScrollLocked: false,
    lockScroll: () => {
        set({ isScrollLocked: true });
        document.body.classList.add('scroll-locked');
        console.log('Scroll locked');
    },
    unlockScroll: () => {
        set({ isScrollLocked: false });
        document.body.classList.remove('scroll-locked');
        console.log('Scroll unlocked');
    },
}));

export default useScrollLockStore;
