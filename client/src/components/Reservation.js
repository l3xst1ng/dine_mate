import React, { useEffect, useState } from 'react';
import './Reservation.css';
import { Link, useParams } from 'react-router-dom';

function Reservation() {
  const { id } = useParams();
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5555/restaurant/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length > 0) {
          const reservationData = data[0];
          setReservation(reservationData);
        } else {
          console.log('No reservation data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReservation();
  }, [id]);

 

  return (
<div className="reservation-container">
      <main class="cd__main">
         <div class="profile-page">
  <div class="content">
 
    <div class="content__title">
      <h1>{reservation.customer?.name}</h1><span></span>
    </div>
    <div class="content__description">
      <p>Email: {reservation.customer?.email}</p>
      <p>Contact: {reservation.customer?.contact}</p>
    </div>
    <ul class="content__list">
      <li><span>{reservation.number_guests}</span>Number Of Guest</li>
      <li><span>{reservation.reservation_time}</span>Time</li>
      <li><span>{reservation.restaurant?.location}</span>Location</li>
    </ul>
  
    <div className="content__list">
                  <Link to={`/Edit/${reservation.restaurant_id}`}>
                  <button type="submit" className="submit-btn">
                        Edit
                    </button>
                  </Link>
       </div>
  </div>

</div>


       
      </main>


</div>

  
  );
}

export default Reservation;
