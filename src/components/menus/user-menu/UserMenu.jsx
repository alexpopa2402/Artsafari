import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import useGlobalScrollLock from '@hooks/useGlobalScrollLock';
import useClickOutside from '@hooks/useClickOutside';
import useFocusTrap from '@hooks/useFocusTrap';

import DarkThemeButton from '@components/buttons/theme-button/DarkThemeButton';

import './UserMenu-style.css';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profile, setProfile] = useState(null);

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                return;
            }
            const { data, error } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                setProfile(null);
                console.log(error);
            } else {
                setProfile(data);
            }
        };

        fetchProfile();
    }, [user, supabaseClient]);

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
            return false;
        }
        return true;
    };


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
                <div className="dropdown-content">
                    <div className="animation-container"></div>
                    <div className="animation-container"></div>
                    <div className="animation-container"></div>
                    <div className="animation-container"></div>
                    <div className="user-info" >
                        <div className='menu-avatar-circle' alt="Avatar">
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} alt="Avatar" />
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
                            <button
                                className='collection-item-button'

                                onClick={async () => {
                                    await handleLogout(navigate);
                                    setIsOpen(false);
                                }}
                            >
                                <i className="fa fa-sign-out-alt"></i>
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



//THIS SOLUTION RERENDERS THE COMPONENT EACH TIME THE USER CLICKS ON THE MENU BUTTON. THIS avoids the complexity of global state management.
//THIS WAY THE PROFILE INFO IS ALWAYS UP TO DATE WHEN USER UPDATES IT IN THE SETTINGS PAGE.

//THE PREVIOUS (ABOVE) SOLUTION FETCHES THE PROFILE INFO ONLY ONCE WHEN THE COMPONENT IS MOUNTED.

/* import { useState, useRef, useCallback, useEffect } from 'react';
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
    const [profile, setProfile] = useState(null);

    const user = useUser();
    const supabaseClient = useSupabaseClient();

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchProfile = useCallback( async () => {
        if (!user) {
            return;
        }
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) {
            setProfile(null);
            console.log(error);
        } else {
            setProfile(data);
        }
    }, [user, supabaseClient]);

    const handleLogout = useCallback(async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
            return false;
        }
        return true;
    }, [supabaseClient]);

    useGlobalScrollLock(isOpen);
    useClickOutside(menuRef, () => setIsOpen(false));
    useFocusTrap(menuRef, isOpen);

    const isSettingsPage = location.pathname === '/settings/edit-profile' || 
    location.pathname === '/settings/edit-account';

    const handleMenuToggle = useCallback(async () => {
        if (!isOpen) {
            await fetchProfile();
        }
        setIsOpen(prevState => !prevState);
    }, [isOpen, fetchProfile]);

    useEffect(() => {
        console.log('Rendering User Menu component');
    });

    return (
        <div className="user-menu" ref={menuRef}>
            <button className="fa fa-user" onClick={handleMenuToggle}></button>

            {isOpen && (
                <div className="dropdown-content">
                    <div className="user-info">
                        <div className='menu-avatar-circle' alt="Avatar">
                            <img src={profile?.avatar_url} />
                        </div>
                        <div className='profile-box'>
                            <span className="profile-name">{profile?.full_name}</span>
                            <span className="usermenu-close-popup" onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </div>
                    </div>
                    <div className='user-links'>
                        <div className="collection">
                            <button className='collection-item-button' onClick={() => {
                                setIsOpen(false);
                                navigate('/profile');
                            }}>
                                My profile
                            </button>
                            <button className='collection-item-button' onClick={() => {
                                setIsOpen(false);
                                navigate('/upload-artwork');
                            }}>
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
                                Settings
                            </button>
                            <button
                                className='collection-item-button'
                                onClick={async () => {
                                    await handleLogout(navigate);
                                    setIsOpen(false);
                                }}
                            >
                                Log out
                            </button>
                        </div>
                        {!isSettingsPage && (
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

export default UserMenu; */