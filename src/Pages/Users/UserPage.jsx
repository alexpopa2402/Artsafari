import { useEffect, useState } from 'react';
import { supabase } from '../../Client/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './UserPage-style.css';

const images = [
/*     '/src/assets/81.jpg',
    '/src/assets/abstract.jpg',
    '/src/assets/81.jpg', */
];

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
            } else {
                navigate('/');
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-page">
            <div className="profile-section">
                <div className="avatar">A</div>
                <span>Welcome, {user.user_metadata.name}</span>
            </div>
            <div className="divider"></div>
            <div className="gallery-section">
                <h2>Your Gallery</h2>
                <div className="gallery-container">
                    {images.length === 0 ? (
                        <div className="empty-gallery-message">
                            Nothing to see here - click upload to start sharing your artwork to the world!
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
                <button className="upload-button" onClick={() => navigate('/upload-artwork')}>Upload Your Artwork</button>
            </div>
        </div>
    );
};

export default UserPage;