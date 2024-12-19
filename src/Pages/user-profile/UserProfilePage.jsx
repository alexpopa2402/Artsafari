import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';
import './UserProfilePage-style.css';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import PIC from '@assets/PIC.png'; // Import the image


const images = [
  '/src/assets/images/carousel images/81.jpg',
  '/src/assets/images/carousel images/81.jpg',
  '/src/assets/images/carousel images/81.jpg',
  '/src/assets/images/carousel images/81.jpg',
  '/src/assets/images/carousel images/81.jpg',
  '/src/assets/images/carousel images/81.jpg',
];

const UserProfile = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <Spinner />
  }

  if (!user || !user.user_metadata) {
    return <div>Error: User data not available</div>;
  }

  return (
    <div className="user-page">
      <div className="profile-section">
        <div className='profile-info'>
          <label htmlFor="avatar" className="avatar-label">
            <div className="profile-avatar-circle">
              <div className='profile-picture'>
                <img src={PIC} alt="Avatar" />
                  <button className="fa fa-camera"></button>                 
              </div>
            </div>
          </label>
          <span>
            Welcome, {user.user_metadata.name} !
          </span>
        </div>
        <div className='gallery-buttons'>
        <button
          className="profile-upload-button"
          onClick={() => navigate('/upload-artwork')}>
          Upload Your Artwork
        </button>
        <button
          className="profile-settings-button"
          onClick={() => navigate('/settings/edit-profile')}
          aria-label="Settings"
        >
          <i className="fa fa-cog settings-icon"></i>
          Settings
        </button>
      </div>
      </div>
      <div className="divider"></div>
      <div className="gallery-section">
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
    </div>
  );
};
console.log('Rendering User Profile component');

export default UserProfile;