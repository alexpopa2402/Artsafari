
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { useSwipeable } from 'react-swipeable';

import { useFetchArtworks } from '@hooks/api/useFetchArtworks';

import PropTypes from 'prop-types';

import AuthButton from '@components/buttons/auth-button/AuthButton';
import UploadButton from '@components/buttons/upload-button/UploadButton';

import './Carousel-style.css';

const Carousel = () => {
  const { data, isLoading, isError } = useFetchArtworks(true); // Fetch all artworks
  const [currentIndex, setCurrentIndex] = useState(0);
  const session = useSession();

  // Select 3 random artworks from the fetched data
  const artworks = useMemo(() => {
    if (!data) return [];
    const allArtworks = data.pages.flat();
    const randomIndex = Math.floor(Math.random() * allArtworks.length);
    return allArtworks.slice(randomIndex, randomIndex + 3); // Select 3 artworks starting from the random index
  }, [data]);

  // Go to the previous slide , no need to use useCallback here since the function doesn't depend on any props or state
  const goToPrevious = () => setCurrentIndex(prevIndex => (prevIndex === 0 ? artworks.length : prevIndex - 1));

  // Go to the next slide, use useCallback to memoize the function and prevent unnecessary re-renders
  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === artworks.length ? 0 : prevIndex + 1));
  }, [artworks.length]);

  // Automatically go to the next slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 7000);
    return () => clearInterval(interval);
  }, [goToNext]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // If there is no data, display a loading message
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading artworks</div>;

  return (
    <div className="carousel-container" aria-roledescription="carousel" {...handlers}>
      <div className="carousel-slide">
        <CarouselItem
          key="welcome-section"
/*           src="./src/assets/images/propagart.png" */
          title="Welcome to Youngblood"
          isActive={currentIndex === 0}
          isWelcomeSection={true}
          session={session}
        />
        {artworks.map((artwork, index) => (
          <CarouselItem
            key={artwork.id}
            src={artwork.image_urls[0]}
            title={artwork.title}
            artistName={artwork.artist_name}
            year={artwork.year}
            isActive={index + 1 === currentIndex}
          />
        ))}
      </div>
      <div className='carousel-dynamic-content'>
        <div className="carousel-lines">
          {[...Array(artworks.length + 1)].map((_, index) => (
            <div
              key={index}
              className={`carousel-line ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="carousel-navigation"> 
          <button 
            className="carousel-arrow left-arrow" 
            onClick={goToPrevious} 
            aria-label="Previous slide">
              <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            className="carousel-arrow right-arrow" 
            onClick={goToNext} 
            aria-label="Next slide">
              <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// CarouselItem component
const CarouselItem = ({ src, title, artistName, year, isActive, isWelcomeSection, session }) => {

  return (
    <div className={`carousel-item ${isActive ? 'active' : ''}`} role="tabpanel" aria-hidden={!isActive}>
      {isWelcomeSection ? (
        <div className="homepage-section">
          <img src="./src/assets/images/propagart.png" alt="carousel-image" className="homepage-img1" />
          <div className="homepage-text">
            <h1 className="homepage-title">{title}</h1>
            <p className="carousel-text-full">
              Do you have a passion for creating art? Would you like to showcase your work to a global audience? At ArtSafari, we celebrate artists and provide a platform to share your vision with the world. Sign up today to become part of our growing network of artists.
            </p>
            <p className="carousel-text-short">
              Do you have a passion for creating art? Would you like to showcase your work to a global audience?
            </p>
            {session ? (
              <UploadButton />
            ) : (
              <AuthButton />
            )}
          </div>
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={`${title} by ${artistName}`}
            className="carousel-loading-placeholder"
            loading="lazy"
          />
          <div className="carousel-caption">
            <p>{`${artistName}, ${title}, ${year}`}</p>
          </div>
        </>
      )}
    </div>
  );
};

CarouselItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artistName: PropTypes.string,
  year: PropTypes.number,
  isActive: PropTypes.bool.isRequired,
  isWelcomeSection: PropTypes.bool,
  session: PropTypes.object,
};

export default Carousel;