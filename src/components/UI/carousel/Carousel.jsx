import { useState, useEffect, useCallback } from 'react';
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

/*     useEffect(() => {
        // Preload all images when the component mounts
        images.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }, []); */

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
            /* alt={caption} */ //if you uncomment this line, upon refresh the caption briefly flashes before the image is loaded, which is not ideal
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
