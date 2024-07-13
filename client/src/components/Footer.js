import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <h3>DineMate</h3>
          <p>Easy restaurant reservations</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
         <p><FontAwesomeIcon icon={faEnvelope} /> info@dineease.com</p>
<p><FontAwesomeIcon icon={faPhone} /> (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 DineMate. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;