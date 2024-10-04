
import "./footer-style.css"


const Footer = () => {
      return (
        <footer>
          <nav className="content">
            <ul className="top">
              <li className="logo-details">
                <i className="fab fa-slack"></i>
                <span className="logo_name">Artsafari</span>
              </li>
            </ul>
            <div className="link-boxes">
              <ul className="box" aria-label="Company links">
                <li className="link_name">Magazine</li>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">Our publishers</a>
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
                <li className="link_name">Subscribe to our newsletter</li>
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
