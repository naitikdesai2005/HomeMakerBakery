import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="containerf">
        <div className="section">
          <h2>Bakery Shop</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="section">
          <h3>Company</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="section">
          <h3>Contact</h3>
          <p>(406) 555-0120</p>
          <p><a href="https://www.example.com">www.example.com</a></p>
          <p><a href="mailto:example@gmail.com">example@gmail.com</a></p>
          <p>56, Rajar Golli, Amborkhana, Sylhet</p>
        </div>
        <div className="section">
          <h3>Get the latest information</h3>
          <div className="newsletter">
            <input type="email" placeholder="Email address" />
            <button>&gt;</button>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <p>Copyright © 2023 Bakery Shop App. All Rights Reserved.</p>
        <p><a href="#">User Terms & Conditions</a> | <a href="#">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;
