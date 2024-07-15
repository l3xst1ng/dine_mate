

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookReservationForm.css';
import { FaUtensils, FaClock, FaCheckCircle, FaInfoCircle, FaTshirt, FaUtensilSpoon } from 'react-icons/fa';

function BookReservationForm() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [guest, setGuest] = useState('');
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchRestaurants();
    }, []);

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
            setErrorMessage('Failed to load restaurants. Please try again later.');
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

    const reservation = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const selectedRestaurant = restaurantsList.find(r => r.id === parseInt(restaurant));
        const selectedRestaurantName = selectedRestaurant ? selectedRestaurant.name : 'Unknown Restaurant';

        const reservationData = {
            name,
            email,
            contact,
            date,
            restaurant,
            guest: parseInt(guest)
        };

        try {
            const response = await fetch('https://dine-mate.onrender.com/create_reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(`Reservation submitted successfully for ${selectedRestaurantName}.`);
                setName('');
                setEmail('');
                setContact('');
                setDate('');
                setRestaurant('');
                setGuest('');
                
                localStorage.setItem('lastReservationRestaurant', selectedRestaurantName);

                setTimeout(() => {
                    setSuccessMessage(prevMessage => 
                        `${prevMessage} Redirecting to restaurants page. Please click on ${selectedRestaurantName} to view your reservation details.`
                    );
                }, 2000);

                setTimeout(() => {
                    navigate('/restaurants');
                }, 5000);
            } else {
                throw new Error(data.message || 'Failed to submit reservation');
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
            setErrorMessage('Failed to submit reservation. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="reservation-page">
            <div className="reservation-header">
                <h1>Reserve Your Perfect Dining Experience</h1>
                <p>Effortless bookings at top-rated restaurants. Enjoy exclusive perks and create memorable moments with DineMate.</p>
            </div>
            
            <div className="reservation-content">
                <div className="form-section">
                    <h2><FaUtensils /> Create Reservation</h2>
                    <form onSubmit={reservation} className={`form-container ${isSubmitting ? 'submitting' : ''}`}>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="contact">Contact:</label>
                                <input type="tel" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} disabled={isSubmitting} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date:</label>
                                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={isSubmitting} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="restaurant">Restaurant:</label>
                                <select id="restaurant" value={restaurant} onChange={(e) => setRestaurant(e.target.value)} disabled={isSubmitting}>
                                    <option value="">Select a restaurant</option>
                                    {restaurantsList.map((rest) => (
                                        <option key={rest.id} value={rest.id}>{rest.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="guests">Guests:</label>
                                <input type="number" id="guests" name="guests" value={guest} onChange={(e) => setGuest(e.target.value)} disabled={isSubmitting} />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Book Now'}
                        </button>
                    </form>
                </div>
                
                <div className="info-section">
                    <div className="dining-tips">
                        <h2><FaClock /> Dining Tips</h2>
                        <ul>
                            <li><FaCheckCircle /> Arrive on time for your reservation</li>
                            <li><FaInfoCircle /> Inform the restaurant of any dietary restrictions in advance</li>
                            <li><FaTshirt /> Check the dress code before you go</li>
                            <li><FaUtensilSpoon /> Be open to trying the chef's recommendations</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookReservationForm;