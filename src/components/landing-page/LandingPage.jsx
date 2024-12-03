import './LandingPage-style.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className='rectangle-container'>
        <div className="rectangle rectangle-1"></div>
        <div className="rectangle rectangle-2"></div>
        <div className="rectangle rectangle-3"></div>
        <div className="rectangle rectangle-4"></div>
        <div className="rectangle rectangle-5"></div>
      </div>
      <div className='all-text-container'>
        <div className='big-text-container'>
          <div className='big-letter-left slide-in-left'>Y</div>
          <div className='big-letter-right slide-in-right' >B</div>
        </div>
        <div className="medium-text-container">
          <div className="text-row ">YOUNG</div>
          <div className="text-row ">BLOOD</div>
          <div className="text-row slide-in-left slow">3.0</div>
          <div className='small-text-container'>
            <div className="small-text-row">sponsored by</div>
            <div className="small-text-row">Art Safari</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;