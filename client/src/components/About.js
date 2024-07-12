import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaHeart, FaSmile } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page" style={{ backgroundColor: '#FF8C00', padding: '40px' }}>
      <div className="hero-section">
        <div className="hero-grid">
          <div className="hero-image parallax" style={{ backgroundImage: `url('https://i.pinimg.com/564x/5b/f9/0f/5bf90fe482b1b411365bddb576b4c71d.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="hero-content" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', color: 'white', marginBottom: '16px' }}>About Dine-mate</h1>
            <p style={{ fontSize: '24px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px' }}>Bringing people together, one meal at a time.</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 style={{ fontSize: '36px', color: 'white', textAlign: 'center', marginBottom: '24px' }}>Our Story</h2>
        <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px', marginBottom: '16px' }}>Dine-mate was founded on the idea that sharing a meal with others is one of life's greatest pleasures. Our team of foodies and tech enthusiasts came together to create a platform that makes it easy for people to discover and book tables at their favorite restaurants.</p>
        <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px' }}>We believe that dining out should be a seamless and enjoyable experience, which is why we're dedicated to providing a user-friendly platform that connects diners with top-rated restaurants.</p>
      </div>

      <div className="mission-section">
        <h2 style={{ fontSize: '36px', color: 'white', textAlign: 'center', marginBottom: '24px' }}>Our Mission</h2>
        <div className="mission-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridGap: '24px' }}>
          <div className="mission-item" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '24px', borderRadius: '8px' }}>
            <FaUtensils className="mission-icon" style={{ fontSize: '48px', color: 'white', display: 'block', margin: '0 auto', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '16px' }}>Delicious Experiences</h3>
            <img src="https://i.pinimg.com/236x/b5/4d/97/b54d9719620ddd06547b50a6d2e09c02.jpg" alt="Set dining table" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', marginBottom: '16px', borderRadius: '8px' }} />
            <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px' }}>We're passionate about helping people discover new flavors and create unforgettable dining experiences.</p>
          </div>
          <div className="mission-item" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '24px', borderRadius: '8px' }}>
            <FaHeart className="mission-icon" style={{ fontSize: '48px', color: 'white', display: 'block', margin: '0 auto', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '16px' }}>Community Building</h3>
            <img src="https://i.pinimg.com/236x/75/4e/80/754e8033443f2aaf4dec1b5710704066.jpg" alt="Group dining" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', marginBottom: '16px', borderRadius: '8px' }} />
            <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px' }}>We believe that sharing a meal with others is a powerful way to build connections and foster community.</p>
          </div>
          <div className="mission-item" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '24px', borderRadius: '8px' }}>
            <FaSmile className="mission-icon" style={{ fontSize: '48px', color: 'white', display: 'block', margin: '0 auto', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '16px' }}>Exceptional Service</h3>
            <img src="https://i.pinimg.com/474x/3f/3c/27/3f3c2791b6dd3c2557f9461742aa4f58.jpg" alt="Happy waitress" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', marginBottom: '16px', borderRadius: '8px' }} />
            <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px' }}>We're committed to providing exceptional customer service and ensuring that every interaction with Dine-Mate is a positive one.</p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2 style={{ fontSize: '36px', color: 'white', textAlign: 'center', marginBottom: '24px' }}>Meet the Team</h2>
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gridGap: '24px' }}>
          <div className="team-member" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '24px', borderRadius: '8px' }}>
            <img src="https://i.pinimg.com/236x/29/09/3a/29093a3ed0e806c065ec3ea588f07db7.jpg" alt="Team Member 1" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', marginBottom: '16px', borderRadius: '50%', transition: 'transform 0.3s ease' }} />
            <h3 style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '8px' }}>John Doe</h3>
            <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px' }}>Founder & CEO</p>
          </div>
          <div className="team-member" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '24px', borderRadius: '8px' }}>
            <img src="https://i.pinimg.com/236x/ce/ab/24/ceab24d311023b09bf075098b1d0a3ae.jpg" alt="Team Member 2" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', marginBottom: '16px', borderRadius: '50%', transition: 'transform 0.3s ease' }} />
            <h3 style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '8px' }}>Jane Smith</h3>
            <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px' }}>CTO</p>
          </div>
          <div className="team-member" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '24px', borderRadius: '8px' }}>
            <img src="https://i.pinimg.com/236x/94/f5/e5/94f5e5c85b96c219ff181c41f85fd6a4.jpg" alt="Team Member 3" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', marginBottom: '16px', borderRadius: '50%', transition: 'transform 0.3s ease' }} />
            <h3 style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '8px' }}>Bob Johnson</h3>
            <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px' }}>Head of Marketing</p>
          </div>
        </div>
      </div>

      <div className="call-to-action" style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/restaurants" className="cta-button pulse" style={{ backgroundColor: 'white', color: '#FF8C00', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block', marginBottom: '16px', transition: 'transform 0.3s ease' }}>Find a Table</Link>
        <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', lineHeight: '1.6', letterSpacing: '0.5px' }}>Ready to start dining with Dine-mate? Browse our selection of top-rated restaurants and book a table today!</p>
      </div>
    </div>
  );
};

export default AboutPage;