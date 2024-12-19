import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ResettableErrorBoundary from '@components/error-boundary/ResettableErrorBoundary';
import useScrollToTop from './hooks/useScrollToTop';

import Footer from '@components/layout/footer/Footer';
import Header from '@components/layout/header/Header';
import ProtectedRoute from '@components/auth/protected-route/ProtectedRoute';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';

import HomePage from '@pages/home/HomePage';
import UploadFormPage from '@pages/upload-form/UploadFormPage';
import ArtistsPage from '@pages/artists/ArtistsPage';
import GalleryPage from '@pages/gallery/GalleryPage';
import UserProfilePage from '@pages/user-profile/UserProfilePage';

const AboutPage = lazy(() => import('@pages/about/AboutPage'));
const SettingsPage = lazy(() => import('@pages/settings/SettingsPage'));
const EditProfilePage = lazy(() => import('@pages/settings/edit-profile/EditProfilePage'));
const EditAccountPage = lazy(() => import('@pages/settings/edit-account/EditAccountPage'));
const NotFoundPage = lazy(() => import('@pages/not-found/NotFoundPage'));

import './assets/styles/App.css';

export default function App() {

  useScrollToTop();
  console.log('Rendering App component');

  return (
    <>
      <Header />
      <div className='central-container'>
        <ResettableErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}>
                <Route index element={<Navigate to="edit-profile" />} />
                <Route path="edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
                <Route path="edit-account" element={<ProtectedRoute><EditAccountPage /></ProtectedRoute>} />
              </Route>
              <Route path="/upload-artwork" element={<ProtectedRoute><UploadFormPage /></ProtectedRoute>} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ResettableErrorBoundary>
      </div>
      <Footer />
    </>
  );
}