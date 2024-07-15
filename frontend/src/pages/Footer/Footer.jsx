// import React from 'react';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="containerf">
//         <div className="section">
//           <h2>Bakery Shop</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//           <div className="social-icons">
//             <a href="#"><i className="fab fa-facebook-f"></i></a>
//             <a href="#"><i className="fab fa-youtube"></i></a>
//             <a href="#"><i className="fab fa-twitter"></i></a>
//             <a href="#"><i className="fab fa-instagram"></i></a>
//           </div>
//         </div>
//         <div className="section">
//           <h3>Company</h3>
//           <ul>
//             <li><a href="#">Home</a></li>
//             <li><a href="#">Features</a></li>
//             <li><a href="#">Services</a></li>
//             <li><a href="#">About Us</a></li>
//             <li><a href="#">Contact Us</a></li>
//           </ul>
//         </div>
//         <div className="section">
//           <h3>Contact</h3>
//           <p>(406) 555-0120</p>
//           <p><a href="https://www.example.com">www.example.com</a></p>
//           <p><a href="mailto:example@gmail.com">example@gmail.com</a></p>
//           <p>56, Rajar Golli, Amborkhana, Sylhet</p>
//         </div>
//         <div className="section">
//           <h3>Get the latest information</h3>
//           <div className="newsletter">
//             <input type="email" placeholder="Email address" />
//             <button>&gt;</button>
//           </div>
//         </div>
//       </div>
//       <div className="bottom-bar">
//         <p>Copyright © 2023 Bakery Shop App. All Rights Reserved.</p>
//         <p><a href="#">User Terms & Conditions</a> | <a href="#">Privacy Policy</a></p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faGooglePlusG,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Commerce Theme</h3>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter Your Email*" />
            <button type="submit">Subscribe</button>
          </form>
          <p>Get monthly updates and free resources.</p>
        </div>
        <div className="footer-section">
          <h3>MOBIRISE</h3>
          <p>Phone: +1 (0) 000 0000 001</p>
          <p>Email: yourmail@domain.com</p>
          <p>Address: 1234 Street Name City, AA 99999</p>
          <div className="social-links">
            <a href="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faBehance} />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>RECENT NEWS</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Get In Touch</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>LINKS</h3>
          <ul>
            <li>
              <a href="#">Website Builder</a>
            </li>
            <li>
              <a href="#">Download for Mac</a>
            </li>
            <li>
              <a href="#">Download for Windows</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
