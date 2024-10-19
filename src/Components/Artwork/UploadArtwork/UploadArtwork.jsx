import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadArtwork-style.css';

const UploadArtwork = () => {
    const [title, setTitle] = useState('');
    const [medium, setMedium] = useState('');
    const [year, setYear] = useState('');
    const [materials, setMaterials] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');
    const [notes, setNotes] = useState('');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [totalSize, setTotalSize] = useState(0);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const uniqueNewFiles = newFiles.filter(newFile => !files.some(file => file.name === newFile.name && file.size === newFile.size));
        const newTotalSize = uniqueNewFiles.reduce((acc, file) => acc + file.size, totalSize);
        setFiles(prevFiles => [...prevFiles, ...uniqueNewFiles]);
        setPreviews(prevPreviews => [...prevPreviews, ...uniqueNewFiles.map(file => URL.createObjectURL(file))]);
        setTotalSize(newTotalSize);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files);
        const uniqueNewFiles = newFiles.filter(newFile => !files.some(file => file.name === newFile.name && file.size === newFile.size));
        const newTotalSize = uniqueNewFiles.reduce((acc, file) => acc + file.size, totalSize);
        setFiles(prevFiles => [...prevFiles, ...uniqueNewFiles]);
        setPreviews(prevPreviews => [...prevPreviews, ...uniqueNewFiles.map(file => URL.createObjectURL(file))]);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            title,
            medium,
            year,
            materials,
            height,
            width,
            depth,
            notes,
            files
        });
        navigate('/user-page');
    };

    const handleNumericInput = (e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) {
            e.preventDefault();
        }
    };

    const completionPercentage = (totalSize / (20 * 1024 * 1024)) * 100;

    return (
        <div className="upload-artwork">
            <h2>Upload Your Artwork</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
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
                        <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} onKeyPress={handleNumericInput} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="materials">Materials</label>
                        <input type="text" id="materials" value={materials} onChange={(e) => setMaterials(e.target.value)} required />
                    </div>
                    <div className="form-group dimensions-group">
                        <div className="dimension">
                            <label htmlFor="height">Height</label>
                            <div className="input-with-unit">
                                <input type="text" id="height" value={height} onChange={(e) => setHeight(e.target.value)} onKeyPress={handleNumericInput} required />
                            </div>
                        </div>
                        <div className="dimension">
                            <label htmlFor="width">Width</label>
                            <div className="input-with-unit">
                                <input type="text" id="width" value={width} onChange={(e) => setWidth(e.target.value)} onKeyPress={handleNumericInput} required />
                            </div>
                        </div>
                        <div className="dimension">
                            <label htmlFor="depth">Depth</label>
                            <div className="input-with-unit">
                                <input type="text" id="depth" value={depth} onChange={(e) => setDepth(e.target.value)} onKeyPress={handleNumericInput} required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="photos">Upload Photos</label>
                    <div
                        className="drop-zone"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        Drag and drop photos here or click to select files
                        <input
                            type="file"
                            id="photos"
                            accept=".jpg,.png,.heic"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <button type="button" className = "add-artwork-button" onClick={() => document.getElementById('photos').click()}>
                        Add Photos
                    </button>
                    <div className="file-list">
                        {previews.map((preview, index) => (
                            <div key={index} className="file-item">
                                <img src={preview} alt={`Preview ${index}`} className="file-preview" />
                                <div className="file-info">
                                    <span className='file-name'>{files[index].name}</span>
                                    <span className='file-size'>{(files[index].size / 1024).toFixed(2)} KB</span>
                                </div>
                                <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className = "artwork-submit-button" disabled={totalSize > 20 * 1024 * 1024}>
                    <div className="completion-bar" style={{ width: `${completionPercentage}%` }}></div>
                    <span>{totalSize > 20 * 1024 * 1024 ? 'Limit Exceeded' : 'Submit'}</span>
                </button>
            </form>
        </div>
    );
};

export default UploadArtwork;