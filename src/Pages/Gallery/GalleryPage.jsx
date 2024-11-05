import './GalleryPage-style.css';
import ArtworkCard from '@components/UI/artwork-card/ArtworkCard';
import { useEffect, useState } from 'react';
import carData from '@pages/gallery/artDatabase';

const GalleryPage = () => {
    const [artwork, setArtwork] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setArtwork(carData);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="container">
            {loading ? (
                <p>Loading artwork...</p>
            ) : (
                <div className="product-grid">
                    {artwork.map((car) => (
                        <ArtworkCard key={car.id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;