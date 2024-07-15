
import React, { useState, useEffect } from 'react';
import './BookReservationForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaUserFriends, FaUtensils } from 'react-icons/fa';

function EditReservation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [guest, setGuest] = useState('');
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`https://dine-mate.onrender.com/reservation/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const reservationData = data;
        setName(reservationData.customer?.name);
        setEmail(reservationData.customer?.email);
        setContact(reservationData.customer?.contact);
        setDate(reservationData.reservation_time.split('T')[0]); // Extract date part
        setRestaurant(reservationData.restaurant?.id);
        setGuest(reservationData.number_guests);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to load reservation details. Please try again.');
      }
    };

    fetchReservation();
    fetchRestaurants();
  }, [id]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('https://dine-mate.onrender.com/restaurants');
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const data = await response.json();
      setRestaurantsList(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setErrorMessage('Failed to load restaurants. Please try again.');
    }
  };

  const validateForm = () => {
    if (!name || !email || !contact || !date || !restaurant || !guest) {
      setErrorMessage('Please fill in all fields.');
      return false;
    }
    if (isNaN(parseInt(guest)) || parseInt(guest) <= 0) {
      setErrorMessage('Number of guests must be a valid number greater than 0.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const reservationData = {
      name,
      email,
      contact,
      reservation_time: date,
      restaurant_id: restaurant,
      number_guests: parseInt(guest)
    };

    try {
      const response = await fetch(`https://dine-mate.onrender.com/reservation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) {
        throw new Error('Failed to update reservation');
      }
      setSuccessMessage('Reservation updated successfully');
      setTimeout(() => navigate('/restaurants'), 2000);
    } catch (error) {
      console.error('Error updating reservation:', error);
      setErrorMessage('Failed to update reservation. Please try again later.');
    }
  };

  return (
    <div className="reservation-page">
      <div className="reservation-header">
        <h1>Edit Your Reservation</h1>
        <p>Update your dining experience details below</p>
      </div>
      <div className="reservation-content">
        <div className="form-section">
          <h2>Reservation Details</h2>
          <form onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact">Contact:</label>
                <input type="tel" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="restaurant">Restaurant:</label>
                <select id="restaurant" value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                  <option value="">Select a restaurant</option>
                  {restaurantsList.map((rest) => (
                    <option key={rest.id} value={rest.id}>
                      {rest.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="guests">Guests:</label>
                <input type="number" id="guests" value={guest} onChange={(e) => setGuest(e.target.value)} />
              </div>
            </div>
            
            <button type="submit" className="submit-btn">Update Reservation</button>
          </form>
        </div>
        <div className="info-section">
          <h2>Dining Tips</h2>
          <div className="dining-tips">
            <ul>
              <li><FaCalendarAlt /> Book in advance for popular times</li>
              <li><FaUserFriends /> Inform us of any special occasions</li>
              <li><FaUtensils /> Check the restaurant's dress code</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditReservation;