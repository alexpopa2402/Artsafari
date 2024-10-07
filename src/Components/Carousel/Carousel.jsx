import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel-style.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed to 3 seconds
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className='carouselImage1'>
          <img src="/src/assets/guernica.jpeg" alt="Image 1" />
        </div>
        <div>
          <img src="/src/assets/picassos.webp" alt="Image 2" />
        </div>
        <div>
          <img src="/src/assets/greatwaves.jpg" alt="Image 3" />
        </div>
      </Slider>
    </div>
  );
};

import PropTypes from 'prop-types';

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{ ...style, display: 'block', background: 'transparent', right: '10px', zIndex: 1 }}
        onClick={onClick}
      />
    );
  };

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow`}
        style={{ ...style, display: 'block', background: 'transparent', left: '10px', zIndex: 1 }}
        onClick={onClick}
      />
    );
  };

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Carousel;