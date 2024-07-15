import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:info@dinemate.com?subject=Contact from ${name}&body=${message}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-form">
          <h2>Send us a message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-contact-btn">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Contact Information</h2>

            <p className='contact-headers'><strong>Address:</strong> <span className="contact-info">123 DineMate St, Nairobi City, FC 12345</span></p> 
            <p className='contact-headers'><strong>Phone:</strong> <span className="contact-info">(123) 456-7890</span></p>
            <p className='contact-headers'><strong>Email:</strong> <span className="contact-info">info@dinemate.com</span></p>
            <p className='contact-headers'><strong>Hours:</strong> <span className="contact-info">Mon-Fri: 9am-5pm</span></p>

        </div>
      </div>
    </div>
  );
};

export default Contact;