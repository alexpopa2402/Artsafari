import { Link, Outlet, useLocation } from 'react-router-dom';
import './SettingsPage-style.css';
import BackButton from '@components/buttons/back-button/BackButton';
import DarkThemeButton from '@components/buttons/theme-button/DarkThemeButton';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';
import { useUser } from '@supabase/auth-helpers-react';

const SettingsPage = () => {

  const location = useLocation();
  const activeTab = location.pathname.split('/').pop();
  const user = useUser();

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="settings-page">
      <BackButton />
      <div className="settings-title"> Settings </div>
      <div className='settings-shelf'>
        <div className="tabs">
          <Link to="edit-profile" className={`tab ${activeTab === 'edit-profile' ? 'active' : ''}`}>
            Edit Profile
          </Link>
          <Link to="edit-account" className={`tab ${activeTab === 'edit-account' ? 'active' : ''}`}>
            Account Settings
          </Link>
        </div>
        <DarkThemeButton />
      </div>
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;