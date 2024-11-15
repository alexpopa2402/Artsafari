import '@pages/settings/SettingsPage-style.css';

const EditAccountPage = () => {
  return (
    <div className='edit-account-page'>
      <div className='account-layout'>
        <h2>Account Information</h2>
        <div className='email-reset-form'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required='' value='' />
        </div>
        <button>Save Changes</button>
        <div className="divider"></div>
        <div className='password-reset-form'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required='' value='' />
        </div>
        <button>Create New Password</button>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default EditAccountPage;