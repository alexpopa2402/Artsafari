import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '@components/buttons/back-button/BackButton';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import './ArtworkDetailPage-style.css';
import { useFetchSingleArtwork } from '@hooks/api/useFetchSingleArtwork';

const ArtworkDetailPage = () => {
  const { slug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const artworkId = parseInt(slug.split('-')[0]);
  const { data: artwork, isLoading, error } = useFetchSingleArtwork(artworkId);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % artwork.image_urls.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + artwork.image_urls.length) % artwork.image_urls.length);
  };

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
          <button className='clickable__image__zoom'>
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
            {`${artwork.width} x ${artwork.height} x ${artwork.depth}`}
          </p>
          <p className="artwork__detail">
            <p className="artwork__detail__label">
              Notes:
            </p>
            {artwork.notes || 'N/A'}
          </p>
        </div>
      </div>
    </>
  );
};

export default ArtworkDetailPage;


/* import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import BackButton from '@components/buttons/back-button/BackButton';

import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import './ArtworkDetailPage-style.css';

const ArtworkDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { slug } = useParams();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchArtwork = async () => {
      const [id] = slug.split('-');

      try {
        // Fetch the artwork using the artwork ID
        const { data: artworkData, error: artworkError } = await supabase
          .from('artworks')
          .select('*')
          .eq('id', id)
          .single();

        if (artworkError) {
          setFetchError('Error fetching artwork');
          console.error('Error fetching artwork:', artworkError);
        } else {
          setArtwork(artworkData);
        }
      } catch (error) {
        setFetchError('An error occurred while fetching data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtwork();
  }, [slug, supabase]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % artwork.image_urls.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + artwork.image_urls.length) % artwork.image_urls.length);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (fetchError) {
    return <p>{fetchError}</p>;
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
          <button className='clickable__image__zoom'>
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
            {`${artwork.width} x ${artwork.height} x ${artwork.depth}`}
          </p>
          <p className="artwork__detail">
            <p className="artwork__detail__label">
              Notes:
            </p>
            {artwork.notes || 'N/A'}
          </p>
        </div>
      </div>
    </>
  );
};

export default ArtworkDetailPage; */