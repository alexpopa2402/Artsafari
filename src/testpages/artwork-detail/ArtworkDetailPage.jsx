import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '@components/buttons/back-button/BackButton';
import Spinner from '@components/loaders/spinners/GlobalSpinner/Spinner';
import './ArtworkDetailPage-style.css';
import { useFetchSingleArtwork } from '@hooks/apiHooks/useFetchSingleArtwork';
import useScrollLock from '@hooks/useGlobalScrollLock';
import useFocusTrap from '@hooks/useFocusTrap';

const ArtworkDetailPage = () => {
  const { slug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const overlayRef = useRef(null);

  const artworkId = parseInt(slug.split('-')[0]);
  const { data: artwork, isLoading, error } = useFetchSingleArtwork(artworkId);

  // Lock scroll when overlay is open
  useScrollLock(isOverlayOpen);

  // Trap focus within the overlay when it is open
  useFocusTrap(overlayRef, isOverlayOpen);

  // Go to the next image in the slider
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % artwork.image_urls.length);
  };
  // Go to the previous image in the slider
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + artwork.image_urls.length) % artwork.image_urls.length);
  };
  // Open the overlay when the image is clicked
  const handleImageClick = () => {
    setIsOverlayOpen(true);
  };
  // Close the overlay
  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - startPosition.x, y: e.clientY - startPosition.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 }); // Snap picture back to center
  };

/*   const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPosition({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({ x: touch.clientX - startPosition.x, y: touch.clientY - startPosition.y });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  }; */


  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error fetching artwork</p>;
  }

  if (!artwork) {
    return <p>No artwork found</p>;
  }

  return (
    <>
      <div className="artwork__detail__page">
        <BackButton />
        <div className='dummybox_placeholder'></div>
        <div className="image__slider">
          {artwork.image_urls.length > 1 && (
            <button className="slider__button prev" onClick={handlePrevImage}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}
          <button className='clickable__image__zoom' onClick={handleImageClick}>
            <img src={artwork.image_urls[currentImageIndex]} alt={artwork.title} className="artwork__detail__img" />
          </button>
          {artwork.image_urls.length > 1 && (
            <button className="slider__button next" onClick={handleNextImage}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
          <div className="image__indicators">
            {artwork.image_urls.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              ></span>
            ))}
          </div>
        </div>
        <div className="artwork__details">
          <p className="artwork__detail__title__year">
            <p className="artwork__detail__title">{artwork.title},&nbsp;
              <p className="artwork__detail__year">{artwork.year} </p>
            </p>
          </p>
          <div className='artwork__details__divider'></div>
          <p className="artwork__detail">
            <p className="artwork__detail__label">
              Medium:
            </p>
            {artwork.medium}
          </p>
          <p className="artwork__detail">
            <p className="artwork__detail__label">
              Materials:
            </p>
            {artwork.materials}
          </p>
          <p className="artwork__detail">
            <p className="artwork__detail__label">
              Dimensions:
            </p>
            {`${artwork.width} x ${artwork.height} x ${artwork.depth} cm`}
          </p>
          <p className="artwork__detail">
            <p className="artwork__detail__label">
              Notes:
            </p>
            <br style={{ marginTop: '1.5rem' }} />
            {artwork.notes || 'N/A'}
          </p>
        </div>
      </div>
      {isOverlayOpen && (
        <div ref={overlayRef} className="overlay" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} >
          <button className="overlay__close" onClick={handleOverlayClose}>X</button>
            <img
              src={artwork.image_urls[currentImageIndex]}
              alt={artwork.title}
              style={{ transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)` }}
              className="overlay__image"
              onMouseDown={handleMouseDown}
            />
          <div className="overlay__zoom__controls">
            <button
              className="zoom__button__decrease"
              onClick={() => setZoomLevel((prevZoom) => Math.max(1, prevZoom - 0.1))}
              tabIndex="0"
            >
            <i className="fa-solid fa-minus"></i>
            </button>

            <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
            className="overlay__zoom__slider"
            tabIndex="0"
          />

            <button
              className="zoom__button__increase"
              onClick={() => setZoomLevel((prevZoom) => Math.min(3, prevZoom + 0.1))}
              tabIndex="0"
            >
            <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtworkDetailPage;