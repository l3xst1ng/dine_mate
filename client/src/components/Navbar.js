import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">DineEase</Link>
    </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/book">Book a Reservation</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;