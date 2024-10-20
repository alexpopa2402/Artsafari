
import "./Footer-style.css"


const Footer = () => {
      return (
        <footer>
          <nav className="content">
            <div className="top">
              <li className="logo-details">
                <i className="fa fa-qrcode"></i>
                <span className="logo_name">Youngblood 3.0</span>
              </li>
            </div>
            <div className="link-boxes">
              <ul className="box" aria-label="Company links">
                <li className="link_name">Website</li>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About us</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">Report an issue</a>
                </li>
              </ul>
              <ul className="box" aria-label="Account links">
                <li className="link_name">Account</li>
                <li>
                  <a href="#">Profile</a>
                </li>
                <li>
                  <a href="#">My account</a>
                </li>
                <li>
                  <a href="#">Purchases</a>
                </li>
              </ul>
              <form className="box input-box" aria-label="Subscribe newsletter">
                <li className="link_name">Newsletter</li>
                <li>
                  <input className="email-field" type="email" placeholder="Enter your email" />
                </li>
                <li>
                  <input className="subscribe-button "type="submit" value="Subscribe" />
                </li>
              </form>
            </div>
          </nav>
          <div className="bottom-details">
            <div className="bottom_text">
              <span className="copyright_text">
                Copyright © 2024 <a href="/">Artsafari</a> <a>All rights reserved</a> 
              </span>
            <span className="policy_terms">
                <a href="#">Privacy policy</a>
                <a href="#">Terms & conditions</a>
              </span> 
            </div>
          </div>
        </footer>
      );
    };
   

export default Footer;
