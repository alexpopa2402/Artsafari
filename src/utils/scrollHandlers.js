/* //exported to be used in the Header component
export const setupScrollListener = () => {
  const header = document.querySelector('.main-header');
  const title = document.querySelector('.main-title');
  const subtitle = document.querySelector('.sub-title');
  const observer = new IntersectionObserver(
    ([entry]) => {
      const isIntersecting = entry.isIntersecting;
      header.classList.toggle('shrunk', !isIntersecting);
      header.classList.toggle('scrolled', !isIntersecting);
      title.classList.toggle('shrunk', !isIntersecting);
      subtitle.classList.toggle('shrunk', !isIntersecting);
    },
    { threshold: 1 }
  );

  // Create sentinel element
  const sentinel = document.createElement('div');
  sentinel.style.position = 'absolute';
  sentinel.style.top = '0';
  sentinel.style.height = '1px';
  document.body.prepend(sentinel);

  observer.observe(sentinel);

  return () => {
    observer.disconnect();
    sentinel.remove();
  };
};

//exported to be used in the useGlobalScrollLock hook
export const setScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}; */


/* export const setupScrollListener = () => {
  const handleScroll = () => {
    if (window.scrollY > 100) {
      document.querySelector('header').classList.add('shrink');
    } else {
      document.querySelector('header').classList.remove('shrink');
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Return a cleanup function to remove the event listener
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

export const setScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
}; */


export const setupScrollListener = () => {
  const header = document.querySelector('header');
  const headerContainer = document.querySelector('.header-container');
  const titleContainer = document.querySelector('.title-container');
  const title = document.querySelector('.main-title');
  const subtitle = document.querySelector('.sub-title');
  const navLinks = document.querySelector('.nav-links');

  const sentinel = document.createElement('div');
  sentinel.style.position = 'absolute';
  sentinel.style.top = '100px';
  sentinel.style.width = '1px';
  sentinel.style.height = '1px';
  document.body.appendChild(sentinel);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.boundingClientRect.top < 0) {
        header.classList.add('shrink');
        headerContainer.classList.add('shrink');
        titleContainer.classList.add('shrink');
        title.classList.add('shrink');
        subtitle.classList.add('shrink');
        navLinks.classList.add('shrink');

      } else {
        header.classList.remove('shrink');
        headerContainer.classList.remove('shrink');
        titleContainer.classList.remove('shrink');
        title.classList.remove('shrink');
        subtitle.classList.remove('shrink');
        navLinks.classList.remove('shrink');
      }
    },
    { threshold: [0] }
  );

  observer.observe(sentinel);

  return () => {
    observer.disconnect();
    sentinel.remove();
  };
};