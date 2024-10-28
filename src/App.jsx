import {Route, Routes } from 'react-router-dom';

import Footer from '@components/layout/footer/Footer';
import Header from '@components/layout/header/Header';

import HomePage from '@pages/home/HomePage';
import GalleryPage from '@pages/gallery/GalleryPage';
import AboutPage from '@pages/about/AboutPage';
import UserProfile from '@pages/user-profile/UserProfile';
import UploadForm from '@pages/upload-form/UploadForm';
import ArtistsPage from '@pages/artists/ArtistsPage';

import './assets/styles/App.css';

export default function App() {
  return (
      <div className='master-container'>
        <Header />
        <div className='central-container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/upload-artwork" element={<UploadForm />} />
          <Route path="/artists" element={<ArtistsPage />} />
        </Routes>
        </div>
        <Footer />
      </div>
  );
}