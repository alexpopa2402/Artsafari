import { Link, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import './SettingsPage-style.css';

const SettingsPage = () => {
  const user = useAuth();
  const location = useLocation();
  const activeTab = location.pathname.split('/').pop();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settings-page">
      <div className="tabs">
        <Link to="edit-profile" className={`tab ${activeTab === 'edit-profile' ? 'active' : ''}`}>
          Edit Profile
        </Link>
        <Link to="edit-account" className={`tab ${activeTab === 'edit-account' ? 'active' : ''}`}>
          Account Settings
        </Link>
      </div>
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;