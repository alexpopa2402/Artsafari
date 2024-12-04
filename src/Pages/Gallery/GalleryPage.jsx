import './GalleryPage-style.css';
import ArtworkCard from '@components/UI/artwork-card/ArtworkCard';
import { useEffect, useState } from 'react';
import carData from '@pages/gallery/artDatabase';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';

const GalleryPage = () => {
    const [artwork, setArtwork] = useState([]);
    const [loading, setLoading] = useState(true);
    

/*     useEffect(() => {
        // Simulate an error for testing purposes
        throw new Error('Simulated error in Gallery page');
    }, []); */

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setArtwork(carData);
            setLoading(false);
        }, 70000);
    }, []);

    return (
        <div className="gallery-container">
            {loading ? (
                <Spinner />
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
console.log('Rendering Gallery component');
export default GalleryPage;