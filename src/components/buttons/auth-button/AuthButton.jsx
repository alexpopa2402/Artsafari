import { useState, Suspense } from "react";
import ReactDOM from "react-dom";
import useGlobalScrollLock from "@hooks/useGlobalScrollLock";
import "./AuthButton-style.css";
import Spinner from "@components/loading-skeletons/Spinner/Spinner";
import AuthModals from "@components/auth/auth-modals/AuthModals";

const AuthButton = () => {
  const [showModal, setShowModal] = useState(false);

  useGlobalScrollLock(showModal);

  return (
    <>
      <button className="login-button" onClick={() => setShowModal(true)}>
        Log in
      </button>
      {showModal &&
        ReactDOM.createPortal(
          <Suspense fallback={<Spinner />}>
            <AuthModals onClose={() => setShowModal(false)} />
          </Suspense>,
          document.body
        )}
    </>
  );
};
console.log("Rendering AuthButton component");
export default AuthButton;
