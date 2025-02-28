import React, { useState, useMemo, useCallback } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
/* import { useFetchSingleProfile } from "@hooks/apiHooks/useFetchSingleProfile"; */
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '@components/buttons/back-button/BackButton';
import UploadSubmitButton from '@components/buttons/upload-submit-button/UploadSubmitButton';
import imageCompression from "browser-image-compression";
import './ArtworkUploadPage-style.css';

interface ArtworkFormData {
  title: string;
  medium: string;
  year: string;
  materials: string;
  height: string;
  width: string;
  depth: string;
  notes: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_CONCURRENT_UPLOADS = 3;
const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/heic', 'image/webp'];

const UploadImages = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
/*   const { data: profile} = useFetchSingleProfile(); */
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  // Consolidated form state
  const [formData, setFormData] = useState<ArtworkFormData>({
    title: '',
    medium: '',
    year: '',
    materials: '',
    height: '',
    width: '',
    depth: '',
    notes: ''
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState({ loading: false, error: '', success: false });
  const [conversionStatus, setConversionStatus] = useState<string[]>([]);

  // Memoized derived values
  const totalSize = useMemo(() =>
    files.reduce((acc, file) => acc + file.size, 0),
    [files]
  );

  const isFormValid = useMemo(() => {
    const { title, medium, year, materials, height, width, depth } = formData;
    return (
      !!title &&
      !!medium &&
      year.length === 4 &&
      !!materials &&
      !!height &&
      !!width &&
      !!depth &&
      files.length > 0 &&
      totalSize <= MAX_FILE_SIZE
    );
  }, [formData, files.length, totalSize]);

  // Unified input handler
  const handleInputChange = useCallback((field: keyof ArtworkFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    }, []);

  // File validation
  const validateFile = useCallback((file: File) => ({
    isSupported: SUPPORTED_MIME_TYPES.includes(file.type),
    isDuplicate: files.some(f =>
      f.name === file.name &&
      f.size === file.size &&
      f.lastModified === file.lastModified
    )
  }), [files]);

  // File handling
/*   const handleFileAdd = useCallback((newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const { isSupported, isDuplicate } = validateFile(file);
      return isSupported && !isDuplicate;
    });

    setFiles(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...validFiles.map(URL.createObjectURL)]);
  }, [validateFile]);

  const handleFileRemove = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  }, []); */
  
  // File handling with webp conversion
  const handleFileAdd = useCallback(async (newFiles: File[]) => {
    const validFiles = await Promise.all(newFiles.map(async (file, index) => {
      const { isSupported, isDuplicate } = validateFile(file);
      if (isSupported && !isDuplicate) {
        setConversionStatus(prev => [...prev, 'converting/compressing...']);
        const compressedFile = await imageCompression(file, { 
          maxSizeMB: 1, 
          maxWidthOrHeight: 1920, 
          useWebWorker: true,
          fileType: 'image/webp'
        });
        setConversionStatus(prev => {
          const newStatus = [...prev];
          newStatus[index] = 'done';
          return newStatus;
        });
        return compressedFile;
      }
      return null;
    }));

    const filteredFiles = validFiles.filter(file => file !== null) as File[];
    setFiles(prev => [...prev, ...filteredFiles]);
    setPreviews(prev => [...prev, ...filteredFiles.map(URL.createObjectURL)]);
  }, [validateFile]);

  const handleFileRemove = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    setConversionStatus(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !user ) return;

    setStatus({ loading: true, error: '', success: false });

    try {
      // Upload files with concurrency control
      const uploadQueue = [...files];
      const uploadedPaths: string[] = [];

      while (uploadQueue.length > 0) {
        const batch = uploadQueue.splice(0, MAX_CONCURRENT_UPLOADS);
        const results = await Promise.all(
          batch.map(file => {
            const filePath = `${user.id}/${uuidv4()}`;
            return supabase.storage
              .from("artworks")
              .upload(filePath, file)
              .then(({ error }) => error ? null : filePath);
          })
        );

        uploadedPaths.push(...results.filter(Boolean) as string[]);
      }

      if (uploadedPaths.length !== files.length) {
        throw new Error('Some files failed to upload');
      }

      // Save artwork data
      const CDNURL = "https://lnaxrtumnyzyegjcwlcs.supabase.co/storage/v1/object/public/artworks/";
      const { error } = await supabase.from("artworks").insert({
        ...formData,
        user_id: user.id,
        image_urls: uploadedPaths.map(path => `${CDNURL}${path}`)
      });

      if (error) throw error;

      setStatus({ loading: false, error: '', success: true });
      setTimeout(() => {navigate('/profile'); }, 3000);
    } catch (err) {
      setStatus(prev => ({ ...prev, error: err instanceof Error ? err.message : 'Upload failed' }));
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
      previews.forEach(URL.revokeObjectURL);
      setFiles([]);
      setPreviews([]);
      setConversionStatus([]);
    }
  }, [isFormValid, user, files, formData, supabase, navigate, previews, status]);

  // Year input validation
  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData(prev => ({ ...prev, year: value }));
  }, []);

  // Numeric input handler
  const handleNumericInput = useCallback((e: React.KeyboardEvent) => {
    if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  return (
    <form className="upload-artwork" onSubmit={handleSubmit}>
      {/* Header Section */}
      <div className="home-link">
        <Link to="/">Youngblood</Link>
      </div>

      {/* Upload Controls */}
      <div className="upload-header-wrapper-sticky">
        <div className="upload-header-buttons">
          <BackButton />
          <UploadSubmitButton
            loading={status.loading}
            disabled={!isFormValid}
            totalSize={totalSize}
          />
        </div>
      </div>

      {/* Status Messages */}
      {status.error && (
        <div role="alert" className="error-popup" aria-live="assertive">
          {status.error}
        </div>
      )}
      {status.success && (
        <div role="status" className="success-popup" aria-live="polite">
          Upload successful!
        </div>
      )}

      {/* Main Form Content */}
      <div className='form-container'>
        <h2>Upload Your Artwork</h2>

        <div className="form-grid">
          {/* Form Fields */}
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              id="title"
              type="text"
              maxLength={50}
              value={formData.title}
              onChange={handleInputChange('title')}
              required
              aria-describedby="title-help"
            />
          </div>

          {/* Medium Selector */}
          <div className="form-group">
            <label htmlFor="medium">Medium*</label>
            <div className="select-wrapper">
              <select
                id="medium"
                value={formData.medium}
                onChange={handleInputChange('medium')}
                required
              >
                <option value="" disabled>Select</option>
                <option value="Painting">Painting</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Photography">Photography</option>
                <option value="Print">Print</option>
                <option value="Drawing, Collage or other Work on Paper">Drawing, Collage or other Work on Paper</option>
                <option value="Mixed Media">Mixed Media</option>
                <option value="Performance Art">Performance Art</option>
                <option value="Installation">Installation</option>
                <option value="Video/Film/Animation">Video/Film/Animation</option>
                <option value="Architecture">Architecture</option>
                <option value="Fashion Design and Wearable Art">Fashion Design and Wearable Art</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Design/Decorative Art">Design/Decorative Art</option>
                <option value="Textile Arts">Textile Arts</option>
                <option value="Posters">Posters</option>
                <option value="Books and Portfolios">Books and Portfolios</option>
                <option value="Other">Other</option>
                <option value="Ephemera or Merchandise">Ephemera or Merchandise</option>
                <option value="NFT">NFT</option>
                <option value="Reproduction">Reproduction</option>
              </select>
              <span className="dropdown-icon" aria-hidden="true">&#9662;</span>
            </div>
          </div>

          {/* Year Input */}
          <div className="form-group">
            <label htmlFor="year">Year*</label>
            <input
              title="Specify the year the artwork was created"
              id="year"
              type="number"
              value={formData.year}
              onChange={handleYearChange}
              onKeyDown={handleNumericInput}
              min="1000"
              max="9999"
              required
            />
          </div>

          {/* Materials Input */}
          <div className="form-group">
            <label htmlFor="materials">Materials*</label>
            <input 
              id="materials"
              title="Specify the materials used in the artwork"
              type="text"
              value={formData.materials}
              onChange={handleInputChange('materials')}
              maxLength={100}
              required />
          </div>
          
          {/* Dimensions Inputs */}
          <div className="form-group dimensions-group">
                        <div className="dimension">
                            <label id="height" htmlFor="height">Height*</label>
                            <div className="input-with-unit">
                                <input
                                  title="Specify the height of the artwork" 
                                  type="text" 
                                  maxLength={4} 
                                  value={formData.height} 
                                  onChange={handleInputChange('height')} 
                                  onKeyDown={handleNumericInput} 
                                  required />
                            </div>
                        </div>
                        <div className="dimension">
                            <label id="width" htmlFor="width">Width*</label>
                            <div className="input-with-unit">
                                <input
                                  title="Specify the width of the artwork" 
                                  type="text" 
                                  maxLength={4} 
                                  value={formData.width} 
                                  onChange={handleInputChange('width')} 
                                  onKeyDown={handleNumericInput} 
                                  required />
                            </div>
                        </div>
                        <div className="dimension">
                            <label id="depth" htmlFor="depth">Depth*</label>
                            <div className="input-with-unit">
                                <input
                                  title="Specify the depth of the artwork"
                                  type="text" 
                                  maxLength={4} 
                                  value={formData.depth} 
                                  onChange={handleInputChange('depth')} 
                                  onKeyDown={handleNumericInput} 
                                  required />
                            </div>
                        </div>
                    </div>
          {/* Notes Input */}
          <div className="form-group full-width">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                          title="Add any additional notes or information about the artwork"
                          id="notes" 
                          maxLength={1000} 
                          placeholder="max 1000 characters" 
                          value={formData.notes} 
                          onChange={handleInputChange('notes')}>
                        </textarea>
          </div>
          <label className="required-label" htmlFor="required">* Required</label>

          {/* File Upload Section */}
          <div className="form-group form-group-upload full-width">
            <label htmlFor="photos">Upload Photos</label>
            <div
              className={`drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDrop={e => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
                handleFileAdd(Array.from(e.dataTransfer.files));
              }}
              onDragOver={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-describedby="upload-instructions"
            >
              {isDragging ? 'Drop to upload' : 'Drag and drop photos here'}       
                <input
                  type="file"
                  id="photos"
                  accept={SUPPORTED_MIME_TYPES.join(',')}
                  multiple
                  onChange={e => handleFileAdd(Array.from(e.target.files || []))}
                  hidden
              />
              <span>Supported formats: JPG, PNG, HEIC, WEBP</span> 
              <span>Max total size: {MAX_FILE_SIZE / 1024 / 1024}MB</span>
              <span>You&apos;re currently at: {totalSize > 0 ? (totalSize / 1024).toFixed(2) : 0} KB</span>
              <div className="file-button-container">
                <button
                  type="button"
                  className="add-artwork-button"
                  onClick={() => document.getElementById('photos')?.click()}
                >
                  Or Add Photos
                </button>
              </div>
            </div>

            {/* File Previews */}
            <div className="file-list">
              {previews.map((preview, index) => (
                <FilePreview
                  key={files[index].name}
                  preview={preview}
                  file={files[index]}
                  conversionStatus={conversionStatus[index]}
                  onRemove={() => handleFileRemove(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
        <div className="upload-footer-wrapper-sticky">
        <UploadSubmitButton
              loading={status.loading}
              disabled={!isFormValid}
              totalSize={totalSize}
            />
        </div>
    </form>
  );
};

// Helper components
const FilePreview = ({ preview, file, conversionStatus, onRemove }: {
  preview: string;
  file: File;
  conversionStatus: string;
  onRemove: () => void;
}) => (
  <div className="file-item">
    <div className="file-preview-container">
        <img
          src={preview}
          alt={`Preview of ${file.name}`}
          className="file-preview"
          loading="lazy"
        />
    </div>

    <div className="file-info">
    <span className="file-name">{conversionStatus === 'done' ? file.name : conversionStatus}</span>
    <span className="file-size">{(file.size / 1024).toFixed(1)}KB</span>
    </div>
    <button type="button" onClick={onRemove} aria-label={`Remove ${file.name}`}>Remove</button>
  </div>
);

export default UploadImages;