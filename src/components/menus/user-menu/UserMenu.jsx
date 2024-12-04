import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toggleMenu, handleLogout } from '@utils/menuHandlers';
import useAuth from '@hooks/useAuth';
/* import useGlobalScrollLock from '@hooks/useGlobalScrollLock'; */
import useClickOutside from '@hooks/useClickOutside';
import useCloseOnResize from '@hooks/useCloseOnResize';
import useFocusTrap from '@hooks/useFocusTrap';
import './UserMenu-style.css';
import DarkThemeButton from '@components/buttons/theme-button/DarkThemeButton';

const UserMenu = (session, setSession) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Disable scrolling when popup is open and take into account the scrollbar width
    useEffect(() => {
        const handleScrollLock = () => {
            const centralContainer = document.querySelector('.central-container');
            if (isOpen) {
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                centralContainer.style.paddingRight = `${scrollbarWidth}px`;
                document.body.classList.add('no-scroll');
            } else {
                centralContainer.style.paddingRight = '';
                document.body.classList.remove('no-scroll');
            }
        };

        handleScrollLock();
    }, [isOpen]);

    // Close the popup when clicking outside of it
    useClickOutside(menuRef, () => setIsOpen(false));

    // Close user menu on window resize above 510px
    useCloseOnResize(isOpen, setIsOpen, 510);

    // Trap focus within the user menu when it is open
    useFocusTrap(menuRef, isOpen);

    return (
        <div className="user-menu" ref={menuRef}>
            <div className="fa fa-user" onClick={toggleMenu(isOpen, setIsOpen)}></div>

            {isOpen && (
                <div className="dropdown-content">

                    <div className="user-info" >
                        <div className="avatar">A</div>
                        <div className='profile-box'>
                            <span className="usermenu-close-popup" onClick={toggleMenu(isOpen, setIsOpen)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            <span className="profile-name">{user.user_metadata.name}</span>
                        </div>
                    </div>
                    <div className='user-links'>
                        <div className="collection">
                            <a className='collection-item' href="/profile">My Gallery</a>
                            <a className='collection-item' href="/upload-artwork">Upload section</a>
                        </div>
                        <div className="settings">
                            <div className="divider"></div>
                            <a className='collection-item' href="settings/edit-profile">Settings</a>
                            <a className='collection-item' onClick={() => handleLogout(setSession, navigate)}>Log out</a>
                        </div>
                        <DarkThemeButton />
                    <div className="folded-corner">
                        <div className="corner-bottom-right"></div>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};
console.log('Rendering User Menu component');
export default UserMenu;