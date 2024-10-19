import { useState, useEffect } from 'react';
import './LoginRegisterButton-style.css';
import LoginRegisterCard from '../LoginRegisterCard/LoginRegisterCard';

const LoginRegisterButton = () => {
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
            {showPopup && <LoginRegisterCard onClose={handleClosePopup} />}
        </div>
    );
};

export default LoginRegisterButton;