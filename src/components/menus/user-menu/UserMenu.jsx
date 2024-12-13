import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { handleLogout } from '@utils/authHandlers';
import useAuthStore from '@store/useAuthStore';
import useGlobalScrollLock from '@hooks/useGlobalScrollLock';
import useClickOutside from '@hooks/useClickOutside';
import useFocusTrap from '@hooks/useFocusTrap';
import './UserMenu-style.css';
import DarkThemeButton from '@components/buttons/theme-button/DarkThemeButton';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useAuthStore((state) => state.user);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useGlobalScrollLock(isOpen);

    // Close the popup when clicking outside of it
    useClickOutside(menuRef, () => setIsOpen(false));

    // Trap focus within the user menu when it is open
    useFocusTrap(menuRef, isOpen);
    // Check if the current page is the settings page to hide the theme button
    const isSettingsPage = location.pathname === '/settings/edit-profile' || 
    location.pathname === '/settings/edit-account';

    return (
        <div className="user-menu" ref={menuRef}>
            <button className="fa fa-user" onClick={() => setIsOpen(!isOpen)}></button>

            {isOpen && (
                <div className="dropdown-content">

                    <div className="user-info" >
                        <div className="avatar">A</div>
                        <div className='profile-box'>
                            <span className="profile-name">{user.user_metadata.name}</span>
                            <span className="usermenu-close-popup" onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </div>
                    </div>
                    <div className='user-links'>
                        <div className="collection">
                            <a className='collection-item' href="/profile">My profile</a>
                            <a className='collection-item' href="/upload-artwork">Upload section</a>
                        </div>
                        <div className="settings">
                            <div className="divider"></div>
                            <a className='collection-item' href="settings/edit-profile">Settings</a>
                            <a className='collection-item' onClick={async () => {
                                await handleLogout(navigate);
                                setIsOpen(false);
                            }}>Log out</a>
                        </div>
                        {!isSettingsPage && ( // Hide the theme button and folded corner on the settings page
                            <>
                              <DarkThemeButton />
                              <div className="folded-corner">
                                <div className="corner-bottom-right"></div>
                              </div>
                            </>
                    )}
                    </div>
                </div>
            )}
        </div>
    );
};
console.log('Rendering User Menu component');
export default UserMenu;