

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaStar, FaGift, FaCog } from 'react-icons/fa';
import backgroundImage from '../assets/images/Cover.png';
import './Home.css';

const HomePage = () => {
  const [bookingCount, setBookingCount] = useState(9850);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Simulate booking count increase
    const interval = setInterval(() => {
      setBookingCount(prevCount => prevCount + 1);
    }, 5000);

    // Set greeting based on time of day
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good morning');
      else if (hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
    };

    updateGreeting();
    const greetingInterval = setInterval(updateGreeting, 60000); // Update every minute

    return () => {
      clearInterval(interval);
      clearInterval(greetingInterval);
    };
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-grid">
          <div className="hero-image parallax" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
          <div className="hero-content">
            <span className="greeting">{greeting}!</span>
            <h1>Your Perfect Table Awaits</h1>
            <p>Effortless reservations at your favorite restaurants</p>
            <h2 className="secondary-headline">Discover, Book, and Dine with Ease</h2>
            <Link to="/restaurants" className="cta-button pulse">Find a Table</Link>
            <div className="social-proof">
              <span>{bookingCount.toLocaleString()}+ happy diners served</span>
            </div>
            <div className="hero-benefits">
              <h3>Why Choose DineEase?</h3>
              <div className="benefits">
                <div className="benefit-item">
                  <FaClock className="benefit-icon" />
                  <span>Instant Booking</span>
                </div>
                <div className="benefit-item">
                  <FaStar className="benefit-icon" />
                  <span>Curated Selection</span>
                </div>
                <div className="benefit-item">
                  <FaGift className="benefit-icon" />
                  <span>Special Perks</span>
                </div>
                <div className="benefit-item">
                  <FaCog className="benefit-icon" />
                  <span>Easy Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;