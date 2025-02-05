import '@pages/settings/SettingsPage-style.css';

const EditAccountPage = () => {
  return (
    <div className='edit-account-page'>
      <div className='account-layout'>
        <div className='form-group'>
          
        <div className='email-reset-form'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required='' value='' placeholder='Select new Email' />
        </div>
        <button>Save Changes</button>

        <div className='password-reset-form'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required='' value='' placeholder='Select new Password' />
        </div>
        <button>Create New Password</button>
        </div>
      </div>
    </div>
  );
};

export default EditAccountPage;