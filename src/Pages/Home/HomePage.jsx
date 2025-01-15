import "./HomePage-style.css";
import Carousel from "@components/UI/carousel/Carousel";
/* import LandingPage from "@components/landing-page/LandingPage"; */

const HomePage = () => {
    return (
        <div className="homepage-container">
{/*             <LandingPage /> */}
            <Carousel />
            <main className="homepage-main">
                <section className="homepage-section">
                    <div className="homepage-content">
                        <div className="homepage-text">
                            <h1 className="homepage-title">
                                Welcome to Artsafari Youngblood 3.0: Discover art from young artists around the world
                            </h1>
                            <p>
                                Do you have a passion for creating art? Would you like to showcase your work to a global audience? At ArtSafari, we celebrate artists and provide a platform to share your vision with the world. Sign up today to become part of our growing network of artists, where you can submit your artwork, build your portfolio, and connect with other creatives. Whether you&aposre a painter, sculptor, photographer, or mixed media artist, we welcome you to join our community and share your unique perspective with art lovers everywhere.
                            </p>
                        </div>
                        <img src="/src/assets/images/logo/artwork-banner.webp" alt="Sample" className="homepage-img1" />
                        <img src="/src/assets/images/youngartists.webp" alt="Sample" className="homepage-img2" />
                    </div>
                </section>
            </main>
        </div>
    );
};
console.log('Rendering HomePage component');
export default HomePage;