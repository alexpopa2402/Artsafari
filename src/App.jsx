import { Route, Routes, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ResettableErrorBoundary from '@components/error-boundary/ResettableErrorBoundary';
import useScrollToTop from './hooks/useScrollToTop';

import MainLayout from '@components/layout/MainLayout';
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
const ResetPasswordPage = lazy(() => import('@pages/reset-password/ResetPasswordPage'));

import './assets/styles/App.css';

import useAuthStore from '@store/useAuthStore';
import { useEffect } from 'react';



export default function App() {

  const { fetchAuthData, initializeAuthListener } = useAuthStore();

  useEffect(() => {
    fetchAuthData(); // Fetch user data when app loads
    const unsubscribeAuthListener = initializeAuthListener(); // Set up listener to handle session changes

    return () => {
      unsubscribeAuthListener(); // Clean up listener on component unmount
    };
  }, [fetchAuthData, initializeAuthListener]);

  useScrollToTop();

  console.log('Rendering App component');

  return (
    <>
      <MainLayout>
        <ResettableErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/upload-artwork" element={<UploadFormPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/settings" element={<SettingsPage />}>
                  <Route index element={<Navigate to="edit-profile" />} />
                  <Route path="edit-profile" element={<EditProfilePage />} />
                  <Route path="edit-account" element={<EditAccountPage />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </ResettableErrorBoundary>
        </MainLayout>
    </>
  );
}