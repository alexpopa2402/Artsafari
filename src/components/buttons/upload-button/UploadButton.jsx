import ButtonSpinner from '@components/loading-skeletons/ButtonSpinner/ButtonSpinner';
import PropTypes from 'prop-types';
import './UploadButton-style.css';

const UploadButton = ({ isUploading, isFormValid, totalSize, completionPercentage }) => {
  return (
    <button type="submit" className="artwork-submit-button" disabled={!isFormValid()}>
      <div className={`completion-bar ${totalSize > 5 * 1024 * 1024 ? 'exceeded' : isFormValid() ? 'valid' : ''}`} style={{ width: `${completionPercentage}%` }}></div>
      <span>{isUploading ? <ButtonSpinner /> : (totalSize > 5 * 1024 * 1024 ? 'Limit Exceeded' : 'Upload Artwork')}</span>
    </button>
  );
};

UploadButton.propTypes = {
  isUploading: PropTypes.bool.isRequired,
  isFormValid: PropTypes.func.isRequired,
  totalSize: PropTypes.number.isRequired,
  completionPercentage: PropTypes.number.isRequired,
};

export default UploadButton;