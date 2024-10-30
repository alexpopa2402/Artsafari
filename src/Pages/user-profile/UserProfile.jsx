import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import './UserProfile-style.css';

const images = [
/*     '/src/assets/81.jpg',
    '/src/assets/abstract.jpg',
    '/src/assets/81.jpg', */
];

const UserProfile = () => {
    const user = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
  
    const handleImageClick = (image) => {
      setSelectedImage(image);
    };
  
    const handleCloseModal = () => {
      setSelectedImage(null);
    };
  
    if (!user) {
      return <div>Loading...</div>;
    }

    return (
        <div className="user-page">
          <div className="profile-section">
            <div className="avatar">
              <i className="fa fa-camera"></i>
            </div>
            <span>Welcome, {user.user_metadata.name}</span>
            <Link to="/settings/edit-profile" className="settings-button">Settings</Link>
          </div>
          <div className="divider"></div>
          <div className="gallery-section">
            <h2>Your Gallery</h2>
            <div className="gallery-container">
              {images.length === 0 ? (
                <div className="empty-gallery-message">
                  Nothing to see here - click upload to start sharing your artwork with the world!
                </div>
              ) : (
                images.map((image, index) => (
                  <div key={index} className="gallery-item" onClick={() => handleImageClick(image)}>
                    <img src={image} alt={`Gallery ${index}`} />
                  </div>
                ))
              )}
    
              {selectedImage && (
                <div className="modal" onClick={handleCloseModal}>
                  <span className="close">&times;</span>
                  <img className="modal-content" src={selectedImage} alt="Full Screen" />
                </div>
              )}
            </div>
          </div>
          <div className="upload-section">
            <button className="profile-upload-button" onClick={() => navigate('/upload-artwork')}>Upload Your Artwork</button>
          </div>
        </div>
      );
    };
    
    export default UserProfile;