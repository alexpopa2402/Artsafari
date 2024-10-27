import { useState, useEffect } from 'react';
import AuthModals from '@components/auth/auth-modals/AuthModals';
import './AuthButton-style.css';

const AuthButton = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    // Disable scrolling when popup is open
    useEffect(() => {
        if (showPopup) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [showPopup]);

    return (
        <div>
            <button className="login-button" onClick={handleButtonClick}>
                Log in / Sign up
            </button>
            {showPopup && <AuthModals onClose={handleClosePopup} />}
        </div>
    );
};

export default AuthButton;