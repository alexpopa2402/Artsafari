import ButtonSpinner from '@components/loading-skeletons/ButtonSpinner/ButtonSpinner';

interface UploadButtonProps {
  loading: boolean;
  disabled: boolean;
  totalSize: number;
  completionPercentage: number;
}
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UploadButton: React.FC<UploadButtonProps> = ({ 
  loading, 
  disabled,
  totalSize,
  completionPercentage 
}) => {
  const exceededLimit = totalSize > MAX_FILE_SIZE;
  const percentage = Math.min(completionPercentage, 100);

  return (
    <button
      type="submit"
      className="artwork-submit-button"
      disabled={disabled || exceededLimit || loading}
      aria-disabled={disabled || exceededLimit || loading}
      aria-live="polite"
      aria-describedby="upload-status"
    >
      <div 
        className={`completion-bar ${
          exceededLimit ? 'exceeded' : 
          !disabled ? 'valid' : ''
        }`} 
        style={{ width: `${percentage}%` }}
        aria-hidden="true"
      />
      
      <span id="upload-status">
        {loading ? (
          <ButtonSpinner aria-label="Uploading artwork" />
        ) : exceededLimit ? (
          <span className="status-error">
            Limit Exceeded ({Math.round(totalSize / 1024 / 1024)}MB)
          </span>
        ) : (
          'Upload Artwork'
        )}
      </span>
    </button>
  );
};

export default UploadButton;