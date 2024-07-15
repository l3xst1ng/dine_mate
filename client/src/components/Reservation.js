
import React, { useEffect, useState } from 'react';
import './Reservation.css';
import { Link, useParams } from 'react-router-dom';

// Helper functions to mask data
const maskName = (name) => {
  const nameParts = name.split(' ');
  return nameParts.map(part => `${part[0]}${'*'.repeat(part.length - 1)}`).join(' ');
};

const maskEmail = (email) => {
  const [localPart, domain] = email.split('@');
  return `${localPart[0]}${'*'.repeat(localPart.length - 1)}@${'*'.repeat(domain.length - 4)}${domain.slice(-4)}`;
};

const maskContact = (contact) => {
  return `${contact.slice(0, 1)}${'*'.repeat(contact.length - 3)}${contact.slice(-2)}`;
};

function Reservation() {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`https://dine-mate.onrender.com/restaurant/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length > 0) {
          setReservations(data);
          setRestaurantName(data[0].restaurant.name);
        } else {
          console.log('No reservation data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReservation();
  }, [id]);

  const handleDelete = async (reservationId) => {
    try {
      const response = await fetch(`https://dine-mate.onrender.com/reservation/${reservationId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }
      setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== reservationId));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="reservation-container">
      <h1 className="reservation-header">Reservations at {restaurantName}</h1>
      <div className="reservation-intro">
        <p>Streamline your dining operations and enhance guest experiences.</p>
        <p>Effortlessly manage bookings, optimize table turnover, and deliver exceptional service.</p>
      </div>
      
      {reservations.length === 0 ? (
        <div className="no-reservations">
          <p>No current reservations for this restaurant.</p>
          <p>When bookings arrive, they'll appear here for easy management.</p>
        </div>
      ) : (
        <>
          <div className="reservation-summary">
            <p className="reservation-count">{reservations.length} active reservation(s)</p>
            <p className="reservation-action-prompt">Review, modify, or cancel bookings as needed.</p>
          </div>
          <div className="reservation-grid">
            {reservations.map((reservation) => (
              <div className="reservation-card" key={reservation.id}>
                <h2 className="customer-name">{maskName(reservation.customer?.name)}</h2>
                <div className="reservation-details">
                  <p><strong>Email:</strong> {maskEmail(reservation.customer?.email)}</p>
                  <p><strong>Contact:</strong> {maskContact(reservation.customer?.contact)}</p>
                  <p><strong>Guests:</strong> {reservation.number_guests}</p>
                  <p><strong>Date:</strong> {new Date(reservation.reservation_time).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {new Date(reservation.reservation_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
                <div className="reservation-actions">
                  <Link to={`/Edit/${reservation.id}`} className="edit-btn">Modify</Link>
                  <button className="delete-btn" onClick={() => handleDelete(reservation.id)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="reservation-footer">
        <p>Elevate your restaurant's efficiency with DineMate's powerful reservation management.</p>
        <p>Questions or need assistance? <a href="/https://dine-mate-sandy.vercel.app/contact" className="support-link">Contact our support team</a>.</p>
      </div>
    </div>
  );
}

export default Reservation;
