import { useEffect, useState } from 'react';
import { supabase } from '../../Client/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './UserPage-style.css';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
            <div className="welcome-section">
                <h1>Welcome, {user.user_metadata.name}</h1>
            </div>
            <div className="profile-section">
                <img src="path/to/profile-picture.jpg" alt="Profile Picture" className="profile-picture" />
            </div>
            <div className="gallery-section">
                <h2>Your Gallery</h2>
                {/* Add gallery items here */}
            </div>
            <div className="upload-section">
                <button className="upload-button">Upload Your Artwork</button>
            </div>
        </div>
    );
};

export default UserPage;