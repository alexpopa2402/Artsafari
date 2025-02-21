import './EditAccountPage-style.css';

const EditAccountPage = () => {
  return (
    <div className='edit-account-page'>

      <h2>Information</h2>

      <form className='form-layout'>
        <div className='form-group'>

          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required='' value='' placeholder='Select new Email' />
          <button>Save Changes</button>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required='' value='' placeholder='Select new Password' />
          <button>Create New Password</button>
        </div>

      </form>
    </div>
  );
};

export default EditAccountPage;

