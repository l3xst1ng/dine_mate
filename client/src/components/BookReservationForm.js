import React, { useState, useEffect } from 'react';
import './BookReservationForm.css';

function BookReservationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [guest, setGuest] = useState('');
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5555/restaurants');
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }
            const data = await response.json();
            setRestaurantsList(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
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

        const reservationData = {
            name,
            email,
            contact,
            date,
            restaurant,
            guest: parseInt(guest)
        };

        try {
            const response = await fetch('http://127.0.0.1:5555/create_reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });
            if (!response.ok) {
                throw new Error('Failed to submit reservation');
            }
            setSuccessMessage('Reservation submitted successfully');
            setName('');
            setEmail('');
            setContact('');
            setDate('');
            setRestaurant('');
            setGuest('');
        } catch (error) {
            console.error('Error submitting reservation:', error);
            setErrorMessage('Failed to submit reservation. Please try again later.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={reservation} className="form-container">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <p className='text-head'>Create Reservation</p>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="restaurant">Restaurant:</label>
                    <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                        <option value="">Select a restaurant</option>
                        {restaurantsList.map((restaurant) => (
                            <option key={restaurant.id} value={restaurant.id}>
                                {restaurant.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="guests">Guests:</label>
                    <input
                        type="number"
                        value={guest}
                        onChange={(e) => setGuest(e.target.value)}
                        id="guests"
                        name="guests"
                    
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookReservationForm;