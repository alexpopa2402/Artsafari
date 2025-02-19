import React from 'react';
import { useNavigate } from 'react-router-dom';

const UploadButton: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/upload-artwork');
    };

    return (
        <button onClick={handleClick}>
            Upload Artwork
        </button>
    );
};

export default UploadButton;