// Desc: Custom hook to lock/unlock global scroll. Used in AuthButton, HamburgerMenu and Usemenu components.

import { useEffect, useRef } from 'react';
import useScrollLockStore from '@store/useScrollLockStore';
import { setScrollbarWidth } from '@utils/scrollHandlers';

const useScrollLock = (isLocked) => {
    const { lockScroll, unlockScroll } = useScrollLockStore();
    const wasLocked = useRef(false); // Ref to track if scroll was locked previously

    useEffect(() => {
        if (isLocked) {
            setScrollbarWidth(); // Adjust scrollbar width
            lockScroll();
            wasLocked.current = true; // Track that scroll is locked
        } else {
            // Unlock only if it was previously locked
            if (wasLocked.current) {
                unlockScroll();
                wasLocked.current = false; // Track that scroll is unlocked
            }
        }

        return () => {
            // Cleanup: Unlock scroll if it was previously locked
            if (wasLocked.current) {
                unlockScroll();
            }
        };
    }, [isLocked, lockScroll, unlockScroll]);
};

export default useScrollLock;
