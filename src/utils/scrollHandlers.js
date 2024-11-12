
//handleScroll only triggers once when window.scrollY > 0 and resets when window.scrollY = 0. 
//This prevents unnecessary re-triggering of the function.

let isScrolled = false;

export const handleScroll = () => {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 0 && !isScrolled) {
    header.classList.add('scrolled');
    isScrolled = true;
  } else if (window.scrollY === 0 && isScrolled) {
    header.classList.remove('scrolled');
    isScrolled = false;
  }
};

export const setupScrollListener = () => {
  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

export const handleScrollLock = (isOpen, takeScrollbarWidthIntoAccount = false) => {
  if (isOpen) {
    if (takeScrollbarWidthIntoAccount) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.classList.add('no-scroll');
  } else {
    document.body.style.paddingRight = '';
    document.body.classList.remove('no-scroll');
  }
};