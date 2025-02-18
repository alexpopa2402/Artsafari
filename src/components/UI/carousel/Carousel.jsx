import { useFetchArtworks } from '@hooks/api/useFetchArtworks';
import { useMemo } from 'react';
import { useState, useEffect, useCallback } from 'react';
import './Carousel-style.css';
import PropTypes from 'prop-types';
import { useSession } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
  const { data, isLoading, isError } = useFetchArtworks(true); // Fetch all artworks
  const [currentIndex, setCurrentIndex] = useState(0);
  const session = useSession();
  const navigate = useNavigate();

  // Select 3 random artworks from the fetched data
  const artworks = useMemo(() => {
    if (!data) return [];
    const allArtworks = data.pages.flat();
    const shuffled = allArtworks.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3); // Select 3 random artworks
  }, [data]);

  // Go to the previous slide , no need to use useCallback here since the function doesn't depend on any props or state
  const goToPrevious = () => setCurrentIndex(prevIndex => (prevIndex === 0 ? artworks.length : prevIndex - 1));

  // Go to the next slide, use useCallback to memoize the function and prevent unnecessary re-renders
  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === artworks.length ? 0 : prevIndex + 1));
  }, [artworks.length]);
  
  // Automatically go to the next slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  // handler function to navigate to the upload artwork or auth page
  const handleUploadClick = () => {
    if (session) {
      navigate('/upload-artwork');
    } else {
      navigate('/auth'); // Assuming this route opens the AuthModals component
    }
  };

  // If there is no data, display a loading message
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading artworks</div>;

  return (
    <div className="carousel-container" aria-roledescription="carousel">
      <button className="carousel-arrow left-arrow" onClick={goToPrevious} aria-label="Previous slide">
        &#9664;
      </button>
      <div className="carousel-slide">
        <CarouselItem
          key="welcome-section"
          src="/src/assets/images/propagart.png"
          title="Welcome to Artsafari Youngblood"
          isActive={currentIndex === 0}
          isWelcomeSection={true}
          onUploadClick={handleUploadClick}
        />
        {artworks.map((artwork, index) => (
          <CarouselItem
            key={index + 1}
            src={artwork.image_urls[0]}
            title={artwork.title}
            artistName={artwork.artist_name}
            year={artwork.year}
            isActive={index + 1 === currentIndex}
          />
        ))}
      </div>
      <button className="carousel-arrow right-arrow" onClick={goToNext} aria-label="Next slide">
        &#9654;
      </button>
      <div className="carousel-lines">
        {[...Array(artworks.length + 1)].map((_, index) => (
          <div
            key={index}
            className={`carousel-line ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

// CarouselItem component
const CarouselItem = ({ src, title, artistName, year, isActive, isWelcomeSection, onUploadClick }) => (
  <div className={`carousel-item ${isActive ? 'active' : ''}`} role="tabpanel" aria-hidden={!isActive}>
    {isWelcomeSection ? (
      <section className="homepage-section">
        <img src={src} alt="carousel-image" className="homepage-img1" />
        <div className="homepage-text">
          <h1 className="homepage-title">{title}</h1>
          <p>
            Do you have a passion for creating art? Would you like to showcase your work to a global audience? At ArtSafari, we celebrate artists and provide a platform to share your vision with the world. Sign up today to become part of our growing network of artists.
          </p>
          <button onClick={onUploadClick}> Upload </button>
        </div>
      </section>
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

CarouselItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  year: PropTypes.number,
  isActive: PropTypes.bool.isRequired,
  isWelcomeSection: PropTypes.bool,
  onUploadClick: PropTypes.func, // Add prop type for the click handler
};

export default Carousel;