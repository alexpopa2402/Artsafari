
//handleScroll only triggers once when window.scrollY > 0 and resets when window.scrollY = 0. 
//This prevents unnecessary re-triggering of the function.

let isScrolled = false;

export const handleScroll = () => {
  console.log('scrolling');
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