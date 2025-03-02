import "./HomePage-style.css";
import Carousel from "@components/UI/carousel/Carousel";
import GalleryPage from "@testpages/gallery/GalleryPage";
/* import LandingPage from "@components/landing-page/LandingPage"; */

const HomePage = () => {
    return (
        <div className="homepage-container">
            <Carousel />
            <div className="dummy-home-box"></div>
            <GalleryPage />
            <div className="dummy-home-box"></div>
                <div className="homepage-contento">
                    <h2>Featured</h2>
                    <div className="featured-box-container">
                        <div className="featured-box"></div>
                        <div className="featured-box"></div>
                        <div className="featured-box"></div>
                        <div className="featured-box"></div>
                    </div>
                    <div className="dummy-home-box"></div>

                    <h2> Youngblood Editorial </h2>
                    <div className="editorial-box-container">
                        <div className="editorial-box"></div>
                        <div className="editorial-box"></div>
                        <div className="editorial-box"></div>
                        <div className="editorial-box"></div>
                    </div>
                </div>
        </div>
    );
};
console.log('Rendering HomePage component');
export default HomePage;