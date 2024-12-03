
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

//exported to be used in the Header component
export const setupScrollListener = () => {
  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/* let isScrolled = false;

export const handleScroll = (setHeaderVisible) => {
  if (window.scrollY > 0 && !isScrolled) {
    setHeaderVisible(true); // Show header when scrolling starts
    isScrolled = true;
  } else if (window.scrollY === 0 && isScrolled) {
    setHeaderVisible(false); // Hide header when at the top
    isScrolled = false;
  }
};

// Exported to be used in the Header component
export const setupScrollListener = (setHeaderVisible) => {
  const onScroll = () => handleScroll(setHeaderVisible);
  window.addEventListener('scroll', onScroll);

  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}; */