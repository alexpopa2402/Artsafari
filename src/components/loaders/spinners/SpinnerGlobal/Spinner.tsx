import './Spinner-style.css';

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};
console.log('Rendering Spinner component');
export default Spinner;