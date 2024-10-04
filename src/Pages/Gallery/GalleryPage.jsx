import { useState } from 'react';
import './GalleryPage-style.css';

const images = [
    '/src/assets/81.jpg',
    '/src/assets/abstract.jpg',
    '/src/assets/81.jpg',
    '/src/assets/abstract.jpg',
    '/src/assets/81.jpg',
    '/src/assets/abstract.jpg',
    '/src/assets/81.jpg',
    '/src/assets/abstract.jpg',
    '/src/assets/81.jpg',
    '/src/assets/abstract.jpg',
    '/src/assets/81.jpg',
    '/src/assets/abstract.jpg',
    '/src/assets/81.jpg',
    '/src/assets/abstract.jpg',
    // Add more image paths here
];

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="gallery-container">
            {images.map((image, index) => (
                <div key={index} className="gallery-item" onClick={() => handleImageClick(image)}>
                    <img src={image} alt={`Gallery ${index}`} />
                </div>
            ))}

            {selectedImage && (
                <div className="modal" onClick={handleCloseModal}>
                    <span className="close">&times;</span>
                    <img className="modal-content" src={selectedImage} alt="Full Screen" />
                </div>
            )}
        </div>
    );
};

export default GalleryPage;