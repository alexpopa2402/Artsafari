import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import useGlobalScrollLock from '@hooks/useGlobalScrollLock';
import useClickOutside from '@hooks/useClickOutside';
import useFocusTrap from '@hooks/useFocusTrap';

import DarkThemeButton from '@components/buttons/theme-button/DarkThemeButton';

import './UserMenu-style.css';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = useUser();
    const supabaseClient = useSupabaseClient();

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

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
          console.error('Error logging out:', error.message);
          return false;
        }
        return true;
      };

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
                            <button className='collection-item' onClick={() => {
                                setIsOpen(false);
                                navigate('/profile');
                            }}>
                                My profile
                            </button>
                            <button className='collection-item' onClick={() => {
                                setIsOpen(false);
                                navigate('/upload-artwork');
                            }}>
                                Upload Section
                            </button>
                        </div>
                        <div className="settings">
                            <div className="divider"></div>
                            <button
                                className='collection-item'
                                onClick={() => {
                                    navigate('/settings/edit-profile');
                                    setIsOpen(false);
                                }}
                            >
                                Settings
                            </button>
                            <button
                                className='collection-item'
                                onClick={async () => {
                                    await handleLogout(navigate);
                                    setIsOpen(false);
                                }}
                            >
                                Log out
                            </button>
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