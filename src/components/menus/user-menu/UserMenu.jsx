import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFetchSingleProfile } from '@hooks/apiHooks/useFetchSingleProfile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import useGlobalScrollLock from '@hooks/useGlobalScrollLock';
import useClickOutside from '@hooks/useClickOutside';
import useFocusTrap from '@hooks/useFocusTrap';

import DarkThemeButton from '@components/buttons/theme-button/DarkThemeButton';
import LogoutButton from '@components/buttons/logout-button/LogoutButton';

import './UserMenu-style.css';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: profile} = useFetchSingleProfile();

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Lock the scroll when the user menu is open
    useGlobalScrollLock(isOpen);

    // Close the popup when clicking outside of it
    useClickOutside(menuRef, () => setIsOpen(false));

    // Trap focus within the user menu when it is open
    useFocusTrap(menuRef, isOpen);

    // Check if the current page is the settings page to hide the theme button
    const isSettingsPage =
        location.pathname === '/settings/edit-profile' ||
        location.pathname === '/settings/edit-account';

    return (
        <div className="user-menu" ref={menuRef}>
            <button className="fa fa-user" onClick={() => setIsOpen(!isOpen)}></button>

            {isOpen && (
                    <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
{/*                     <div className="animation-container"></div>
                    <div className="animation-container"></div>
                    <div className="animation-container"></div>
                    <div className="animation-container"></div> */}
                    <div className="user-info" >
                        <div className='menu-avatar-circle' alt="Avatar">
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} />
                            ) : (
                                <i className="fa fa-camera camera-icon"></i>
                            )}
                        </div>
                        <div className='profile-box'>
                            <span className="profile-name">{profile.full_name}</span>
                            <button className="usermenu-close-popup" onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        </div>
                    </div>
                    <div className='user-links'>
                        <div className="collection">
                            <button className='collection-item-button' onClick={() => {
                                setIsOpen(false);
                                navigate('/profile');
                            }}>
                                <i className="fa fa-user"></i>
                                My profile
                            </button>
                            <button className='collection-item-button' onClick={() => {
                                setIsOpen(false);
                                navigate('/upload-artwork');
                            }}>
                                <i className="fa fa-solid fa-upload"></i>
                                Upload Section
                            </button>
                        </div>
                        <div className="divider"></div>
                        <div className="settings">
                            <button
                                className='collection-item-button'
                                onClick={() => {
                                    navigate('/settings/edit-profile');
                                    setIsOpen(false);
                                }}
                            >
                                <i className="fa fa-cog settings-icon"></i>
                                Settings
                            </button>
                                <LogoutButton closeMenu={() => setIsOpen(false)} />
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