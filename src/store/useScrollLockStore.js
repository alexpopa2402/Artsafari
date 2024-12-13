/* import {create} from "zustand";

const useScrollLockStore = create((set, get) => ({
  activeLocks: 0,
  lockScroll: () => {
    const currentLocks = get().activeLocks + 1;
    set({ activeLocks: currentLocks });
    if (currentLocks > 0) {
      document.body.style.overflow = "hidden";
    }
  },
  unlockScroll: () => {
    const currentLocks = Math.max(get().activeLocks - 1, 0);
    set({ activeLocks: currentLocks });
    if (currentLocks === 0) {
      document.body.style.overflow = "";
    }
  },
}));

export default useScrollLockStore; */

/* import create from "zustand";

const useScrollLockStore = create((set, get) => ({
  activeLocks: 0,
  incrementLocks: () => {
    const currentLocks = get().activeLocks + 1;
    set({ activeLocks: currentLocks });
  },
  decrementLocks: () => {
    const currentLocks = Math.max(get().activeLocks - 1, 0);
    set({ activeLocks: currentLocks });
  },
}));

export default useScrollLockStore; */

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
