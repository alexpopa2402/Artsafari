import './GalleryPage-style.css';
import ArtworkCard from '@components/UI/artwork-card/ArtworkCard';
import carData from '@pages/gallery/artDatabase';

const GalleryPage = () => {
    return (
        <div className="container">
            <div className="product-grid">
                {carData.map((car) => (
                    <ArtworkCard key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;