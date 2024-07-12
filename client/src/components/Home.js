import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaStar, FaGift, FaCog, FaSearch, FaCalendarAlt, FaCheck, FaUtensils } from 'react-icons/fa';
import backgroundImage from '../assets/images/Cover.png';
import './Home.css';
import './About.css';

const HomePage = () => {
  const [bookingCount, setBookingCount] = useState(1500);
  const [greeting, setGreeting] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { quote: "Using DineMate has been a game-changer for our date nights. The ease of booking and the special perks for members have made dining out enjoyable and stress-free!” ", author: "Halley" },
    { quote: "DineEase made our anniversary dinner so special. We got the best table without any hassle!", author: "Sarah Mungai" },
    { quote: "I've been using DineEase for several months now, and it's the best way to book restaurants in the city. Highly recommended!", author: "John" },
    { quote: "DineMate made booking dinner so effortless! I love how I can browse through top restaurants and secure a table in just a few taps. It’s my go-to app for dining out!”", author: "John " },
    { quote: "DineMate made booking dinner so effortless! I love how I can browse through top restaurants and secure a table in just a few taps. It’s my go-to app for dining out!”", author: "John " },
    
  ];

  useEffect(() => {
    // Simulating booking count increase
    const bookingInterval = setInterval(() => {
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
    const greetingInterval = setInterval(updateGreeting, 60000); // Update greeting every minute

    // Rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => {
      clearInterval(bookingInterval);
      clearInterval(greetingInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <div className="home-page">


      {/* Hero section */}
      <div className="hero-section">
        <div className="hero-grid">
          <div className="hero-image parallax" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
          <div className="hero-content">
            <span className="greeting">{greeting}!</span>
            <h1>Your Perfect Table Awaits</h1>
            <h2 className="secondary-headline">Discover, Book, and Dine with Ease</h2>
            <p>Effortless reservations at your favorite restaurants</p>
            <Link to="/restaurants" className="cta-button pulse">Find a Table</Link>
            <div className="social-proof">
              <span>{bookingCount.toLocaleString()}+</span>
              <p>Happy Clients Served</p>
            </div>

            <div className="hero-benefits">
              <h3>Discover the DineMate Difference</h3>
              <div className="benefits">
                <div className="benefit-item">
                  <FaClock className="benefit-icon" />
                  <span id='benefit-header'>Instant Booking</span>
                </div>
                <div className="benefit-item">
                  <FaStar className="benefit-icon" />
                  <span id='benefit-header'>Curated Selection</span>
                </div>
                <div className="benefit-item">
                  <FaGift className="benefit-icon" />
                  <span id='benefit-header'>Special Perks</span>
                </div>
                <div className="benefit-item">
                  <FaCog className="benefit-icon" />
                  <span id='benefit-header'>Easy Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* Hero section 2 */}

      <section className="how-it-works">
        <h2>Simple Steps to Your Next Great Meal</h2>
        <ol>
          <li>
            <h3><FaSearch /> Discover</h3>
            <p>Browse our curated list of top-rated restaurants</p>
          </li>
          <li>
            <h3><FaCalendarAlt /> Select</h3>
            <p>Choose your date, time, and party size</p>
          </li>
          <li>
            <h3><FaCheck /> Book</h3>
            <p>Instantly confirm your reservation</p>
          </li>
          <li>
            <h3><FaUtensils /> Dine</h3>
            <p>Show up and enjoy your perfectly prepared table</p>
          </li>
        </ol>
      </section>
      
      <section className="featured-restaurants">
        <h2>Explore Local Favorites</h2>
        <p>From cozy cafes to fine dining, find the perfect spot for any occasion</p>
        <Link to="/restaurants" className="secondary-cta">View All Restaurants</Link>
      </section>

      <section className="testimonial">
        <h2>What Our Users Say</h2>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`testimonial-item ${index === currentTestimonial ? 'active' : ''}`}>
            <blockquote>{testimonial.quote}</blockquote>
            <cite>- {testimonial.author}</cite>
          </div>
        ))}
      </section>

      <section className="special-offer">
        <h2>New to DineEase?</h2>
        <p>Enjoy 20% off your first reservation</p>
        <button className="cta-button">Claim Offer</button>
      </section>

{/* Trust Indicators section */}


      {/* <section className="trust-indicators">
        <p>Trusted by over 1000 diners</p>
        <p>Featured in DishiKenya as 'The Go-To Reservation App'</p>
      </section> */}

<section className="trust-indicators"> 
  <h2 className="trust-indicators-heading">Proven Excellence</h2>
        <div className="indicator">
          <img src="https://via.placeholder.com/50x50" alt="Restaurant Partner Logo" className="logo" />
          <p>Partnered with <strong>TopRestaurants</strong></p>
        </div>
        <div className="indicator">
          <img src="https://via.placeholder.com/50x50" alt="Award Logo" className="logo" />
          <p>Awarded <strong>Best Reservation App 2023</strong></p>
        </div>
        <div className="indicator">
          <img src="https://via.placeholder.com/50x50" alt="Media Logo" className="logo" />
          <p>Featured in <strong>Foodie Magazine</strong> as 'The Go-To Reservation App'</p>
        </div>
      </section>



{/* Final cta section */}

      <section className="final-cta">
        <h2>Ready for your next unforgettable dining experience?</h2>
        <Link to="/book" className="cta-button">Book Your Table Now</Link>
      </section>
    </div>
  );
};

export default HomePage;