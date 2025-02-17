import { useFetchArtworks } from '@hooks/api/useFetchArtworks';
import { useMemo } from 'react';
import { useState, useEffect, useCallback } from 'react';
import './Carousel-style.css';
import PropTypes from 'prop-types';


const Carousel = () => {
    const { data, isLoading, isError } = useFetchArtworks();
    const [currentIndex, setCurrentIndex] = useState(0);

    const artworks = useMemo(() => {
        if (!data) return [];
        const allArtworks = data.pages.flat();
        const shuffled = allArtworks.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3); // Select 3 random artworks
    }, [data]);

    const goToPrevious = () => setCurrentIndex(prevIndex => (prevIndex === 0 ? artworks.length - 1 : prevIndex - 1));

    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === artworks.length - 1 ? 0 : prevIndex + 1));
    }, [artworks.length]);

    useEffect(() => {
        const interval = setInterval(goToNext, 6000);
        return () => clearInterval(interval);
    }, [goToNext]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading artworks</div>;

    return (
        <div className="carousel-container" aria-roledescription="carousel">
            <button className="carousel-arrow left-arrow" onClick={goToPrevious} aria-label="Previous slide">
                &#9664;
            </button>
            <div className="carousel-slide">
                {artworks.map((artwork, index) => (
                    <CarouselItem
                    key={index}
                    src={artwork.image_urls[0]}
                    title={artwork.title}
                    artistName={artwork.artist_name}
                    year={artwork.year}
                    isActive={index === currentIndex}
                    />
                ))}
            </div>
            <button className="carousel-arrow right-arrow" onClick={goToNext} aria-label="Next slide">
                &#9654;
            </button>
            <div className="carousel-lines">
                {artworks.map((_, index) => (
                    <div
                        key={index}
                        className={`carousel-line ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};


const CarouselItem = ({ src, title, artistName, year, isActive }) => (
    <div className={`carousel-item ${isActive ? 'active' : ''}`} role="tabpanel" aria-hidden={!isActive}>
        <img
            src={src}
            alt={`${title} by ${artistName}`}
            className="carousel-loading-placeholder"
/*             loading="lazy" */
        />
        <div className="carousel-caption">
            <p>{`${artistName}, ${title}, ${year}`}</p>
        </div>
    </div>
);

CarouselItem.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default Carousel;


/* import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Carousel-style.css';

const images = [
    { src: '/src/assets/images/carousel images/Mihai Surdu.webp', caption: 'People at the museum - Mihai Surdu' },
    { src: '/src/assets/images/carousel images/Nadejda Lungu.webp', caption: 'Nadejda Lungu (left to right) : Skin and flesh, Naked Flesh, Skin and Knee, Skin and Light ' },
    { src: '/src/assets/images/carousel images/alina-grubnyak.webp', caption: 'Algo-r-(h)-i-(y)-thms, 2018. Installation view at ON AIR, Tomás Saraceno solo exhibition at Palais de Tokyo, Paris, 2018.' }
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, []);

    useEffect(() => {

        // Preload all images when the component mounts
        images.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });

        const interval = setInterval(goToNext, 6000);
        return () => clearInterval(interval);
    }, [goToNext]);

    useEffect(() => {
        // Only preload next image for smoother transitions
        const nextImage = new Image();
        nextImage.src = images[(currentIndex + 1) % images.length].src;
    }, [currentIndex]);

    return (
        <div className="carousel-container" aria-roledescription="carousel">
            <button className="carousel-arrow left-arrow" onClick={goToPrevious} aria-label="Previous slide">
                &#9664;
            </button>
            <div className="carousel-slide">
                {images.map((image, index) => (
                    <CarouselItem
                        key={index}
                        src={image.src}
                        caption={image.caption}
                        isActive={index === currentIndex}
                    />
                ))}
            </div>
            <button className="carousel-arrow right-arrow" onClick={goToNext} aria-label="Next slide">
                &#9654;
            </button>
            <div className="carousel-lines">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`carousel-line ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

console.log('Rendering Carousel component');

const CarouselItem = ({ src, caption, isActive }) => (
    <div className={`carousel-item ${isActive ? 'active' : ''}`} role="tabpanel" aria-hidden={!isActive}>
        <img
            src={src}
            className="carousel-loading-placeholder"
            loading="lazy"
        />
        <div className="carousel-caption">{caption}</div>
    </div>
);


CarouselItem.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default Carousel;
 */