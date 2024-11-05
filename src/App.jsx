import {Route, Routes } from 'react-router-dom';

import Footer from '@components/layout/footer/Footer';
import Header from '@components/layout/header/Header';

import HomePage from '@pages/home/HomePage';
import GalleryPage from '@pages/gallery/GalleryPage';
import AboutPage from '@pages/about/AboutPage';
import UserProfile from '@pages/user-profile/UserProfile';
import UploadForm from '@pages/upload-form/UploadForm';
import ArtistsPage from '@pages/artists/ArtistsPage';
import SettingsPage from '@pages/settings/SettingsPage';
import EditProfilePage from '@pages/settings/edit-profile/EditProfilePage';
import EditAccountPage from '@pages/settings/edit-account/EditAccountPage';
import NotFoundPage from '@pages/not-found/NotFoundPage';

import ProtectedRoute from '@components/auth/protected-route/ProtectedRoute';

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
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}>
            <Route path="edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
            <Route path="edit-account" element={<ProtectedRoute><EditAccountPage /></ProtectedRoute>} />
          </Route>
          <Route path="/upload-artwork" element={<ProtectedRoute><UploadForm /></ProtectedRoute>} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

