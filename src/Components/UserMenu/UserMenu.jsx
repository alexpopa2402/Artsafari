import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../Client/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './UserMenu-style.css';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <div className="user-menu" ref={menuRef}>
            <div className="fa fa-user" onClick={toggleMenu}></div>

            {isOpen && (
                <div className="dropdown-content">

                    <div className="user-info">
                        <div className="avatar">A</div>
                        <div className='profile-box'>
                            <span className="profile-name">{user.user_metadata.name}</span>
                            <span className="view-profile" onClick={() => navigate('/profile')}>View profile</span>
                        </div>
                    </div>
                    <div className="collection">
                        <p>My Collection</p>
                        <a className='collection-item' href="#">Artworks</a>
                        <a className='collection-item' href="#">Artists</a>
                        <a className='collection-item' href="#">Insights</a>
                    </div>
                    <div className="favorites">
                        <p>Favorites</p>
                        <a className='collection-item' href="#">Saves</a>
                        <a className='collection-item' href="#">Follows</a>
                        <a className='collection-item' href="#">Alerts</a>
                    </div>
                    <div className="settings">
                        <div className="divider"></div>
                        <a className='collection-item' href="#">Settings</a>
                        <a className='collection-item' onClick={handleLogout}>Log out</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;