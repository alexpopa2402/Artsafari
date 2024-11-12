import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toggleMenu, handleLogout } from '@utils/menuHandlers';
import useAuth from '@hooks/useAuth';
import useScrollLock from '@hooks/useScrollLock';
import useClickOutside from '@hooks/useClickOutside';
import './UserMenu-style.css';

const UserMenu = (session, setSession) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Disable scrolling when popup is open and take into account the scrollbar width
    useScrollLock(isOpen, true);

    // Close the popup when clicking outside of it
    useClickOutside(menuRef, () => setIsOpen(false));

    return (
        <div className="user-menu" ref={menuRef}>
            <div className="fa fa-user" onClick={toggleMenu(isOpen, setIsOpen)}></div>

            {isOpen && (
                <div className="dropdown-content">

                    <div className="user-info" onClick={() => {toggleMenu(isOpen, setIsOpen)() }}>
                        <div className="avatar">A</div>
                        <div className='profile-box'>
                            <span className="usermenu-close-popup" onClick={toggleMenu(isOpen, setIsOpen)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            <span className="profile-name">{user.user_metadata.name}</span>
                            <a className="view-profile" onClick={() => navigate('/profile')}>View profile</a>
                        </div>
                    </div>
                    <div className='user-links'>
                        <div className="collection">
                            <p>My Collection</p>
                            <a className='collection-item' href="/profile">My Gallery</a>
                            <a className='collection-item' href="/upload-artwork">Upload section</a>
                        </div>
                        <div className="favorites">
                            <p>Favorites</p>
                            <a className='collection-item' href="/gallery">Artworks</a>
                            <a className='collection-item' href="/artists">Artists</a>
                            <a className='collection-item' href="#">Follows</a>
                            <a className='collection-item' href="#">Alerts</a>
                        </div>
                        <div className="settings">
                            <div className="divider"></div>
                            <a className='collection-item' href="settings/edit-profile">Settings</a>
                            <a className='collection-item' onClick={() => handleLogout(setSession, navigate)}>Log out</a>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default UserMenu;