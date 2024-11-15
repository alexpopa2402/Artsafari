import { useState } from 'react';
import ReactDOM from 'react-dom';
import AuthModals from '@components/auth/auth-modals/AuthModals';
import useGlobalScrollLock from '@hooks/useGlobalScrollLock';
import './AuthButton-style.css';

const AuthButton = () => {
    const [showModal, setShowModal] = useState(false);

    // Use global scroll lock
    useGlobalScrollLock(false, showModal);

    return (
        <>
            <button className="login-button" onClick={() => setShowModal(true)}>
                Log in / Sign up
            </button>
            {showModal && ReactDOM.createPortal(
                <AuthModals onClose={() => setShowModal(false)} />,
                document.body
            )}
        </>
    );
};

export default AuthButton;