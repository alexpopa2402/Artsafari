import DarkThemeButton from '@components/buttons/theme-button/DarkThemeButton';
import './EditAccountPage-style.css';

const EditAccountPage = () => {
  return (
    <div className='edit-account-page'>
      <h2>Account Information</h2>
      <div className='email-reset-form'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' required='' value=''/>
      </div>
      <button>Save Changes</button>
      <div className="divider"></div>
      <div className='password-reset-form'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' required='' value=''/>
      </div>
      <button>Create New Password</button>
      <div className="divider"></div>
      <DarkThemeButton />
    </div>
  );
};

export default EditAccountPage;