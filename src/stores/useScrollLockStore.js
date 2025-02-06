import { create } from 'zustand';

const useScrollLockStore = create((set) => ({
    isScrollLocked: false,
    lockScroll: () => {
        set({ isScrollLocked: true });
        document.body.classList.add('scroll-locked');
        const header = document.querySelector('.main-header');
        if (header) { // Check if header exists - useful because the header is not present on all pages (e.g. upload-artwork page)
            header.classList.add('scroll-locked');
        }
        console.log('Scroll locked');
    },
    unlockScroll: () => {
        set({ isScrollLocked: false });
        document.body.classList.remove('scroll-locked');
        const header = document.querySelector('.main-header');
        if (header) {
            header.classList.remove('scroll-locked');
        }
        console.log('Scroll unlocked');
    },
}));

export default useScrollLockStore;
