import { useNavigate } from 'react-router-dom';
import './BackButton-style.css';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/profile')} className="back-button" style={{ cursor: 'pointer' }}>
      <span>&lt; </span> 
      Back to Profile
    </div>
  );
};
console.log('Rendering BackButton component');
export default BackButton;