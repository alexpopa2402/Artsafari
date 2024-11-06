import { useNavigate } from 'react-router-dom';
import './BackButton-style.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/profile')} className="back-button" style={{ cursor: 'pointer' }}>
      <span>&lt; </span> 
      Profile
    </div>
  );
};

export default BackButton;