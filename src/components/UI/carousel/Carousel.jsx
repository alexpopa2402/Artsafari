import { useState, useEffect, useCallback } from 'react';
import './Carousel-style.css';

const Carousel = () => {
    const images = [
        { src: '/src/assets/images/carousel images/Mihai Surdu.avif', caption: 'People at the museum - Mihai Surdu' },
        { src: '/src/assets/images/carousel images/steve-johnson.jpg', caption: 'Abstract painting - Steve Johnson' },
        { src: '/src/assets/images/carousel images/alina-grubnyak.jpg', caption: 'Algo-r-(h)-i-(y)-thms, 2018. Installation view at ON AIR, Tomás Saraceno solo exhibition at Palais de Tokyo, Paris, 2018.' }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images.length]);

    useEffect(() => {
        const interval = setInterval(goToNext, 3000); // Change image every 3 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, [goToNext]);

    return (
        <div className="carousel-container">
            <div className="carousel-arrow left-arrow" onClick={goToPrevious}>
                &#9664;
            </div>
            <div className="carousel-slide">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img
                            src={image.src}
                            alt={`carousel-${index}`}
                            className="carousel-image"
                        />
                        <div className="carousel-caption">{image.caption}</div>
                    </div>
                ))}
            </div>
            <div className="carousel-arrow right-arrow" onClick={goToNext}>
                &#9654;
            </div>
            <div className="carousel-lines">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`carousel-line ${index === currentIndex ? 'active' : ''}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;