import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Styles
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles/App.css';

// Hooks
import useScrollToTop from './hooks/useScrollToTop';

// Components
import MainLayout from '@components/layout/MainLayout';
import ProtectedRoute from '@components/auth/protected-route/ProtectedRoute';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import ResettableErrorBoundary from '@components/error-boundary/ResettableErrorBoundary';

// Public pages
import HomePage from '@Pages/home/HomePage';
import ArtistsPage from '@Pages/artists/ArtistsPage';
import GalleryPage from '@Pages/gallery/GalleryPage';
import ArtworkDetailPage from '@Pages/artwork-detail/ArtworkDetailPage';
const AboutPage = lazy(() => import('@Pages/about/AboutPage'));
const NotFoundPage = lazy(() => import('@Pages/not-found/NotFoundPage'));

// Auth-protected pages
import ArtworkUploadPage from '@Pages/artwork-upload/ArtworkUploadPageTs';
import UserProfilePage from '@Pages/user-profile/UserProfilePage';
import EditProfilePage from '@Pages/settings/edit-profile/EditProfilePageTs';
import EditAccountPage from '@Pages/settings/edit-account/EditAccountPage';
import SettingsPage from '@Pages/settings/SettingsPage';
const ResetPasswordPage = lazy(() => import('@Pages/password-reset/ResetPasswordPage'));


export default function App() {

  useScrollToTop(); // Scroll to top on route change

  console.log('Rendering App component');

  return (
    <MainLayout>
      <ResettableErrorBoundary>
        <Routes>
          <Route path="/reset-password" element={<Suspense fallback={<Spinner />}><ResetPasswordPage /></Suspense>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/about" element={<Suspense fallback={<Spinner />}><AboutPage /></Suspense>} />
          <Route path="/artwork/:slug" element={<ArtworkDetailPage />} />
          {/* <Route path="/artwork/:slug/edit" element={<EditArtworkPage />} /> */}
          <Route path="*" element={<Suspense fallback={<Spinner />}><NotFoundPage /></Suspense>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/upload-artwork" element={<ArtworkUploadPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/settings" element={<SettingsPage />}>
              <Route index element={<Navigate to="edit-profile" />} />
              <Route path="edit-profile" element={<EditProfilePage />} />
              <Route path="edit-account" element={<EditAccountPage />} />
            </Route>
          </Route>

        </Routes>
      </ResettableErrorBoundary>
    </MainLayout>
  );
};