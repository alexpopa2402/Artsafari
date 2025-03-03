import { useNavigate } from 'react-router-dom';
import './BackButton-style.css';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className="back-button" style={{ cursor: 'pointer' }}>
      <span>&lt; </span> 
      Back
    </div>
  );
};
console.log('Rendering BackButton component');
export default BackButton;