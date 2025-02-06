import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

/* import { useAuthStore } from 'stores/useAuthStore'; */
/* import SessionLoader from '@components/auth/sessionLoader'; */

import ResettableErrorBoundary from '@components/error-boundary/ResettableErrorBoundary';
import useScrollToTop from './hooks/useScrollToTop';

import MainLayout from '@components/layout/MainLayout';
import ProtectedRoute from '@components/auth/protected-route/ProtectedRoute';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';

// Public components
import HomePage from '@pages/home/HomePage';
import ArtistsPage from '@pages/artists/ArtistsPage';
import GalleryPage from '@pages/gallery/GalleryPage';
import ArtworkDetailPage from '@pages/artwork-detail/ArtworkDetailPage';

const AboutPage = lazy(() => import('@pages/about/AboutPage'));
const NotFoundPage = lazy(() => import('@pages/not-found/NotFoundPage'));

// Auth-protected components
import ArtworkUploadPage from '@pages/artwork-upload/ArtworkUploadPage';
import UserProfilePage from '@pages/user-profile/UserProfilePage';
import EditProfilePage from '@pages/settings/edit-profile/EditProfilePage';
import EditAccountPage from '@pages/settings/edit-account/EditAccountPage';
import SettingsPage from '@pages/settings/SettingsPage';
const ResetPasswordPage = lazy(() => import('@pages/password-reset/ResetPasswordPage'));



import './assets/styles/App.css';

export default function App() {

  useScrollToTop();

  console.log('Rendering App component');

  return (
    <>
      <MainLayout>
        <ResettableErrorBoundary>
          <Routes>
            <Route path="/reset-password" element={<Suspense fallback={<Spinner />}><ResetPasswordPage /></Suspense>} />
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/about" element={<Suspense fallback={<Spinner />}><AboutPage /></Suspense>} />
            <Route path="/artwork/:slug" element={<ArtworkDetailPage />} />
{/*             <Route path="/artwork/:slug/edit" element={<EditArtworkPage />} />
 */}            <Route path="*" element={<Suspense fallback={<Spinner />}><NotFoundPage /></Suspense>} />

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
    </>
  );
}