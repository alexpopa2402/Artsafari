import { useState, useRef, lazy, Suspense  } from 'react';
import PropTypes from 'prop-types';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import './AuthModals-style.css';
import { faAngleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import YBlogo from '@assets/images/logo/YBlogo.png';
import useFocusTrap from '@hooks/useFocusTrap';

const LoginModal = lazy(() => import('./LoginModal'));
const ForgotPasswordModal = lazy(() => import('./ForgotPasswordModal'));
const SignUpModal = lazy(() => import('./SignUpModal'));
const TermsText = lazy(() => import('./TermsText'));

const AuthModals = ({ onClose }) => {
    const [modal, setModal] = useState('login');
    const modalRef = useRef(null);

    useFocusTrap(modalRef, modal);

    const renderModalContent = () => {     // 'login', 'forgotPassword', 'signUp'
        switch (modal) {
            case 'login':
                return (
                    <>
                        <LoginModal setPopupType={setModal} onClose={onClose} />
                        <TermsText />
                    </>
                );
            case 'forgotPassword':
                return <ForgotPasswordModal setPopupType={setModal} onClose={onClose} />;
            case 'signUp':
                return (
                    <>
                        <SignUpModal setPopupType={setModal} onClose={onClose} />
                        <TermsText />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()} ref={modalRef}>
            <Suspense fallback={<Spinner />}>
                <div className="popup-header">
                    <div className='popup-main-title'>
                        {modal !== 'login' ? (
                            <button className="previous-popup" onClick={() => setModal('login')}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                        ) : (
                            <span style={{ visibility: 'hidden', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        )}
                        <img src={YBlogo} alt="Youngblood Logo" className="logo" />
                        <button className="close-popup" onClick={onClose} aria-label="Close">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
                
                    {renderModalContent()}
                </Suspense>
            </div>
        </div>
    );
};

AuthModals.propTypes = {
    onClose: PropTypes.func.isRequired,
};

console.log('Rendering AuthModals Component');
export default AuthModals;
