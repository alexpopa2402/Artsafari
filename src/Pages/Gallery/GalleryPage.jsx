//import React from 'react';
//import './GalleryPage.css'; // Make sure to create a corresponding CSS file for styling

const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    // Add more image paths here
];

const GalleryPage = () => {
    return (
        <div className="gallery-container">
            {images.map((image, index) => (
                <div key={index} className="gallery-item">
                    <img src={image} alt={`Gallery ${index}`} />
                </div>
            ))}
        </div>
    );
};

export default GalleryPage;