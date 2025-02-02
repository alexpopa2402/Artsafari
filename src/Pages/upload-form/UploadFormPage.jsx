import { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";

import BackButton from '@components/buttons/back-button/BackButton';
import ButtonSpinner from '@components/loading-skeletons/ButtonSpinner/ButtonSpinner';

import './UploadFormPage-style.css';

const UploadImages = () => {
    const supabase = useSupabaseClient();
    const user = useUser();

    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [medium, setMedium] = useState('');
    const [year, setYear] = useState('');
    const [materials, setMaterials] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');
    const [notes, setNotes] = useState('');

    const [previews, setPreviews] = useState([]);
    const [totalSize, setTotalSize] = useState(0);
    const [invalidFileFormat, setInvalidFileFormat] = useState(false);
    const CDNURL = 'https://lnaxrtumnyzyegjcwlcs.supabase.co/storage/v1/object/public/artworks/';

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const supportedFormats = ['image/jpeg', 'image/png', 'image/heic', 'image/webp'];
        const validFiles = [];
        let newTotalSize = totalSize;

        selectedFiles.forEach(file => {
            if (supportedFormats.includes(file.type)) {
                const isDuplicate = files.some(existingFile => existingFile.name === file.name && existingFile.size === file.size);
                if (!isDuplicate) {
                    validFiles.push(file);
                    newTotalSize += file.size;
                }
            } else {
                setInvalidFileFormat(true);
                setTimeout(() => setInvalidFileFormat(false), 3000);
            }
        });

        setFiles([...files, ...validFiles]);
        setTotalSize(newTotalSize);
        setPreviews([...previews, ...validFiles.map(file => URL.createObjectURL(file))]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files);
        const uniqueNewFiles = newFiles.filter(newFile => !files.some(file => file.name === newFile.name && file.size === newFile.size));
        const newTotalSize = uniqueNewFiles.reduce((acc, file) => acc + file.size, totalSize);
        setFiles(prevFiles => [...prevFiles, ...uniqueNewFiles]);
        setPreviews(prevPreviews => [
            ...prevPreviews,
            ...uniqueNewFiles.map(file => URL.createObjectURL(file))
        ]);
        setTotalSize(newTotalSize);
    };

    const handleRemoveFile = (index) => {
        const removedFileSize = files[index].size;
        const newFiles = files.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setFiles(newFiles);
        setPreviews(newPreviews);
        setTotalSize(totalSize - removedFileSize);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!files.length || !user) return;

        setIsUploading(true);
        setError(null);
        setSuccess(false);

        try {
            const uploadedUrls = [];
            for (let file of files) {
                const filePath = user.id + '/' + uuidv4();
                const { error } = await supabase.storage
                    .from("artworks")
                    .upload(filePath, file);
                if (error) {
                    console.error("Error uploading file:", error.message);
                    continue;
                }
                uploadedUrls.push(`${CDNURL}${filePath}`);
            }

            if (uploadedUrls.length > 0) {
                const { error: dbError } = await supabase.from("artworks").insert({
                    user_id: user.id,
                    image_urls: uploadedUrls,
                    title,
                    medium,
                    year,
                    materials,
                    height,
                    width,
                    depth,
                    notes,
                });

                if (dbError) {
                    console.error("Error saving artwork details to database:", dbError.message);
                } else {
                    console.log("Artwork details saved successfully!");
                }
            }

        } catch (err) {
            console.error("Unexpected error during upload:", err);
            setError("Upload failed. Please try again later.");
        } finally {
            setIsUploading(false);
            setFiles([]);
            setPreviews([]);
            setTotalSize(0);
        }
    };

    const handleNumericInput = (e) => {
        const charCode = e.keyCode || e.which;
        // allows backspace, delete, arrow keys, ecc.
        if (
            charCode === 8 || // Backspace
            charCode === 46 || // Delete
            charCode === 37 || // Left arrow
            charCode === 39 || // Right arrow
            charCode === 9 || // Tab
            charCode === 44 || // Comma
            (charCode >= 48 && charCode <= 57) // Numbers 0-9
        ) {
            return;
        }
        e.preventDefault();
    };
    // Handle year input
    const handleYearChange = (e) => {
        const value = e.target.value;
        if (value.length <= 4 && !/^0/.test(value)) {
            setYear(value);
        }
    };

    const isFormValid = () => {
        return (
            title &&
            medium &&
            year &&
            materials &&
            height &&
            width &&
            depth &&
            totalSize <= 20 * 1024 * 1024
        );
    };

    const completionPercentage = (totalSize / (5 * 1024 * 1024)) * 100;

    return (
        <div className="upload-artwork">
            <BackButton />
            {error && <p className="error-popup">{error}</p>}
            {success && <p className="success-popup">Upload successful!</p>}

            <form className='form-container' onSubmit={handleSubmit}>
                <h2>Upload Your Artwork</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label id="title" htmlFor="title">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="medium">Medium</label>
                        <div className="select-wrapper">
                            <select id="medium" value={medium} onChange={(e) => setMedium(e.target.value)} required>
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
                            <span className="dropdown-icon">&#9662;</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input type="number" id="year" value={year} onChange={handleYearChange}
                            onKeyDown={handleNumericInput}
                            maxLength="4"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="materials">Materials</label>
                        <input type="text" id="materials" value={materials} onChange={(e) => setMaterials(e.target.value)} required />
                    </div>
                    <div className="form-group dimensions-group">
                        <div className="dimension">
                            <label id="height" htmlFor="height">Height</label>
                            <div className="input-with-unit">
                                <input type="text" maxLength="4" value={height} onChange={(e) => setHeight(e.target.value)} onKeyDown={handleNumericInput} required />
                            </div>
                        </div>
                        <div className="dimension">
                            <label id="width" htmlFor="width">Width</label>
                            <div className="input-with-unit">
                                <input type="text" maxLength="4" value={width} onChange={(e) => setWidth(e.target.value)} onKeyDown={handleNumericInput} required />
                            </div>
                        </div>
                        <div className="dimension">
                            <label id="depth" htmlFor="depth">Depth</label>
                            <div className="input-with-unit">
                                <input type="text" maxLength="4" value={depth} onChange={(e) => setDepth(e.target.value)} onKeyDown={handleNumericInput} required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" maxLength="200" placeholder="max 200 characters" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="form-group form-group-upload">
                    <label htmlFor="photos">Upload Photos</label>
                    <div
                        className="drop-zone"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        Drag and drop photos here
                        <input
                            type="file"
                            id="photos"
                            accept=".jpg,.png,.heic,.webp"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <span>Supported formats: JPG, PNG, HEIC, WEBP</span>
                        <span>Total maximum size per upload: 5 MB</span>
                        <span>You&apos;re currently at: {totalSize > 0 ? (totalSize / 1024).toFixed(2) : 0} KB</span>
                        <div className="file-button-container">
                            <button type="button" className="add-artwork-button" onClick={() => document.getElementById('photos').click()}>
                                Or Add Photos
                            </button>
                            {invalidFileFormat && <div className="artwork-upload-error-message">One or more files has an invalid format!</div>}
                        </div>
                    </div>

                    <div className="file-list">
                        {previews.map((preview, index) => (
                            <div key={index} className="file-item">
                                <div className='file-preview-container'>
                                    <img src={preview} alt={`Preview ${index}`} className="file-preview" />
                                </div>
                                <div className="file-info">
                                    <span className='file-name'>{files[index].name}</span>
                                    <span className='file-size'>{(files[index].size / 1024).toFixed(2)} KB</span>
                                </div>
                                <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="artwork-submit-button" disabled={!isFormValid()}>
                    <div className={`completion-bar ${totalSize > 5 * 1024 * 1024 ? 'exceeded' : isFormValid() ? 'valid' : ''}`} style={{ width: `${completionPercentage}%` }}></div>
                    <span>{isUploading ? <ButtonSpinner /> : (totalSize > 5 * 1024 * 1024 ? 'Limit Exceeded' : 'Submit')}</span>
                </button>
            </form>
        </div>
    );
};
console.log('Rendering Upload Component');
export default UploadImages;


/* 
import { useState } from "react";
import { useAuthStore } from "stores/useAuthStore";
import { supabase } from '@services/supabaseClient';
import { v4 as uuidv4 } from "uuid";
import './UploadFormPage-style.css';
import BackButton from '@components/buttons/back-button/BackButton';
import ButtonSpinner from '@components/loading-skeletons/ButtonSpinner/ButtonSpinner';
import { useArtworksStore } from "stores/useArtworksStore";

const UploadImages = () => {
    const user = useAuthStore(state => state.user);
    const { addArtwork } = useArtworksStore(); // Get addArtwork from store

    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [medium, setMedium] = useState('');
    const [year, setYear] = useState('');
    const [materials, setMaterials] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');
    const [notes, setNotes] = useState('');

    const [previews, setPreviews] = useState([]);
    const [totalSize, setTotalSize] = useState(0);
    const [invalidFileFormat, setInvalidFileFormat] = useState(false);

    const CDNURL = 'https://lnaxrtumnyzyegjcwlcs.supabase.co/storage/v1/object/public/artworks/';

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const supportedFormats = ['image/jpeg', 'image/png', 'image/heic', 'image/webp'];
        const validFiles = [];
        let newTotalSize = totalSize;

        selectedFiles.forEach(file => {
            if (supportedFormats.includes(file.type)) {
                const isDuplicate = files.some(existingFile => existingFile.name === file.name && existingFile.size === file.size);
                if (!isDuplicate) {
                    validFiles.push(file);
                    newTotalSize += file.size;
                }
            } else {
                setInvalidFileFormat(true);
                setTimeout(() => setInvalidFileFormat(false), 3000);
            }
        });

        setFiles([...files, ...validFiles]);
        setTotalSize(newTotalSize);
        setPreviews([...previews, ...validFiles.map(file => URL.createObjectURL(file))]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files);
        const uniqueNewFiles = newFiles.filter(newFile => !files.some(file => file.name === newFile.name && file.size === newFile.size));
        const newTotalSize = uniqueNewFiles.reduce((acc, file) => acc + file.size, totalSize);
        setFiles(prevFiles => [...prevFiles, ...uniqueNewFiles]);
        setPreviews(prevPreviews => [
            ...prevPreviews,
            ...uniqueNewFiles.map(file => URL.createObjectURL(file))
        ]);
        setTotalSize(newTotalSize);
    };

    const handleRemoveFile = (index) => {
        const removedFileSize = files[index].size;
        const newFiles = files.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setFiles(newFiles);
        setPreviews(newPreviews);
        setTotalSize(totalSize - removedFileSize);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!files.length || !user) return;

        setIsUploading(true);
        setError(null);
        setSuccess(false);

        try {
            const uploadedUrls = [];
            for (let file of files) {
                const filePath = user.id + '/' + uuidv4();
                const { error } = await supabase.storage
                    .from("artworks")
                    .upload(filePath, file);
                if (error) {
                    console.error("Error uploading file:", error.message);
                    continue;
                }
                uploadedUrls.push(`${CDNURL}${filePath}`);
            }

            if (uploadedUrls.length > 0) {
                const { data: newArtwork, error: dbError } = await supabase.from("artworks").insert({
                    user_id: user.id,
                    image_urls: uploadedUrls,
                    title,
                    medium,
                    year,
                    materials,
                    height,
                    width,
                    depth,
                    notes,
                })
                    .select()
                    .single();

                if (dbError) {
                    console.error("Error saving artwork details to database:", dbError.message);
                } else {
                    console.log("Artwork details saved successfully!");
                    addArtwork(newArtwork); // Add to Zustand store
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 3000);
                }
            }

        } catch (err) {
            console.error("Unexpected error during upload:", err);
            setError("Upload failed. Please try again later.");
            setTimeout(() => setError(null), 3000);
        } finally {
            setIsUploading(false);
            setFiles([]);
            setPreviews([]);
            setTotalSize(0);
        }
    };

    const handleNumericInput = (e) => {
        const charCode = e.keyCode || e.which;
        // allows backspace, delete, arrow keys, ecc.
        if (
            charCode === 8 || // Backspace
            charCode === 46 || // Delete
            charCode === 37 || // Left arrow
            charCode === 39 || // Right arrow
            charCode === 9 || // Tab
            charCode === 44 || // Comma
            (charCode >= 48 && charCode <= 57) // Numbers 0-9
        ) {
            return;
        }
        e.preventDefault();
    };
    // Handle year input
    const handleYearChange = (e) => {
        const value = e.target.value;
        if (value.length <= 4 && !/^0/.test(value)) {
            setYear(value);
        }
    };

    const isFormValid = () => {
        return (
            title &&
            medium &&
            year &&
            materials &&
            height &&
            width &&
            depth &&
            totalSize <= 20 * 1024 * 1024 &&
            files.length > 0
        );
    };

    const completionPercentage = (totalSize / (5 * 1024 * 1024)) * 100;

    return (
        <div className="upload-artwork">

            <BackButton />

            {error && <p className="error-popup">{error}</p>}
            {success && <p className="success-popup">Upload successful!</p>}

            <form className='form-container' onSubmit={handleSubmit}>
                <h2>Upload Your Artwork</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label id="title" htmlFor="title">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="medium">Medium</label>
                        <div className="select-wrapper">
                            <select id="medium" value={medium} onChange={(e) => setMedium(e.target.value)} required>
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
                            <span className="dropdown-icon">&#9662;</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input type="number" id="year" value={year} onChange={handleYearChange}
                            onKeyDown={handleNumericInput}
                            maxLength="4"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="materials">Materials</label>
                        <input type="text" id="materials" value={materials} onChange={(e) => setMaterials(e.target.value)} required />
                    </div>
                    <div className="form-group dimensions-group">
                        <div className="dimension">
                            <label id="height" htmlFor="height">Height</label>
                            <div className="input-with-unit">
                                <input type="text" maxLength="4" value={height} onChange={(e) => setHeight(e.target.value)} onKeyDown={handleNumericInput} required />
                            </div>
                        </div>
                        <div className="dimension">
                            <label id="width" htmlFor="width">Width</label>
                            <div className="input-with-unit">
                                <input type="text" maxLength="4" value={width} onChange={(e) => setWidth(e.target.value)} onKeyDown={handleNumericInput} required />
                            </div>
                        </div>
                        <div className="dimension">
                            <label id="depth" htmlFor="depth">Depth</label>
                            <div className="input-with-unit">
                                <input type="text" maxLength="4" value={depth} onChange={(e) => setDepth(e.target.value)} onKeyDown={handleNumericInput} required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" maxLength="200" placeholder="max 200 characters" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="form-group form-group-upload">
                    <label htmlFor="photos">Upload Photos</label>
                    <div
                        className="drop-zone"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        Drag and drop photos here
                        <input
                            type="file"
                            id="photos"
                            accept=".jpg,.png,.heic,.webp"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <span>Supported formats: JPG, PNG, HEIC, WEBP</span>
                        <span>Total maximum size per upload: 5 MB</span>
                        <span>You&apos;re currently at: {totalSize > 0 ? (totalSize / 1024).toFixed(2) : 0} KB</span>
                        <div className="file-button-container">
                            <button type="button" className="add-artwork-button" onClick={() => document.getElementById('photos').click()}>
                                Or Add Photos
                            </button>
                            {invalidFileFormat && <div className="artwork-upload-error-message">One or more files has an invalid format!</div>}
                        </div>
                    </div>

                    <div className="file-list">
                        {previews.map((preview, index) => (
                            <div key={index} className="file-item">
                                <div className='file-preview-container'>
                                    <img src={preview} alt={`Preview ${index}`} className="file-preview" />
                                </div>
                                <div className="file-info">
                                    <span className='file-name'>{files[index].name}</span>
                                    <span className='file-size'>{(files[index].size / 1024).toFixed(2)} KB</span>
                                </div>
                                <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="artwork-submit-button" disabled={!isFormValid()}>
                    <div className={`completion-bar ${totalSize > 5 * 1024 * 1024 ? 'exceeded' : isFormValid() ? 'valid' : ''}`} style={{ width: `${completionPercentage}%` }}></div>
                    <span>{isUploading ? <ButtonSpinner /> : (totalSize > 5 * 1024 * 1024 ? 'Limit Exceeded' : 'Submit')}</span>
                </button>
            </form>
        </div>
    );
};
console.log('Rendering Upload Component');
export default UploadImages;
 */
