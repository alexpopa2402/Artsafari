import ButtonSpinner from '@components/loading-skeletons/ButtonSpinner/ButtonSpinner';

interface UploadButtonProps {
  loading: boolean;
  disabled: boolean;
  totalSize: number;
}
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UploadButton: React.FC<UploadButtonProps> = ({ 
  loading, 
  disabled,
  totalSize,
}) => {
  const exceededLimit = totalSize > MAX_FILE_SIZE;

  return (
    <button
      type="submit"
      className="artwork-submit-button"
      disabled={disabled || exceededLimit || loading}
      aria-disabled={disabled || exceededLimit || loading}
      aria-live="polite"
      aria-describedby="upload-status"
    >
    
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