import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Restaurants.css';
import { Link } from 'react-router-dom'

// Placeholder image
import coverImage from '../assets/images/Cover.png';

// Version Control
const STORAGE_VERSION = '1.0';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Utility function for safe localStorage operations
const safeStorage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  },
  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('Failed to get from localStorage:', e);
      return defaultValue;
    }
  }
};

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [lastReservationRestaurant, setLastReservationRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Restaurant name is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string(),
    image: Yup.string().url('Must be a valid URL'),
  });

  const fetchRestaurants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Check version and cache validity
      const storedVersion = safeStorage.getItem('dataVersion');
      const cachedData = safeStorage.getItem('restaurantData', { timestamp: 0, data: {} });

      if (storedVersion !== STORAGE_VERSION || Date.now() - cachedData.timestamp > CACHE_DURATION) {
        // Fetch fresh data from the server
        const response = await fetch('https://dine-mate.onrender.com/restaurants');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Enhance data with stored descriptions and images
        const enhancedData = data.map(restaurant => ({
          ...restaurant,
          description: cachedData.data[restaurant.id]?.description || restaurant.description || 'No description available',
          image: cachedData.data[restaurant.id]?.image || restaurant.image || '',
        }));
        
        // Update cache
        safeStorage.setItem('restaurantData', { timestamp: Date.now(), data: enhancedData });
        safeStorage.setItem('dataVersion', STORAGE_VERSION);
        setRestaurants(enhancedData);
      } else {
        // Use cached data
        setRestaurants(cachedData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load restaurants. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedRestaurant = localStorage.getItem('lastReservationRestaurant');
    if (storedRestaurant) {
      setLastReservationRestaurant(storedRestaurant);
      localStorage.removeItem('lastReservationRestaurant'); // Clear after reading
    }
    fetchRestaurants();
  }, []);

  const handleAddRestaurant = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const restaurantData = {
        name: values.name,
        location: values.location,
      };

      const response = await fetch('https://dine-mate.onrender.com/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantData),
      });

      if (!response.ok) {
        throw new Error('Failed to add restaurant');
      }

      const newRestaurant = await response.json();

      const enhancedNewRestaurant = {
        ...newRestaurant,
        description: values.description || 'No description available',
        image: values.image || '',
      };

      // Update local storage
      const cachedData = safeStorage.getItem('restaurantData', { timestamp: Date.now(), data: {} });
      cachedData.data[newRestaurant.id] = {
        description: enhancedNewRestaurant.description,
        image: enhancedNewRestaurant.image,
      };
      safeStorage.setItem('restaurantData', cachedData);

      setRestaurants(prevRestaurants => {
        const updatedRestaurants = [...prevRestaurants, enhancedNewRestaurant];
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 100);
        return updatedRestaurants;
      });

      resetForm();
      setSuccessMessage('Restaurant added successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding restaurant:', error);
      setErrorMessage('Failed to add restaurant. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="restaurant-container">
      {lastReservationRestaurant && (
        <div className="reservation-instruction">
          <p>You have a new reservation at {lastReservationRestaurant}. Click on the restaurant card to view your reservation details.</p>
        </div>
      )}

      <h1 className="restaurant-header">Our Partner Restaurants</h1>
      <p className="restaurant-intro">Explore our curated selection of dining experiences and find your perfect meal.</p>

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className={`restaurant-card ${restaurant.name === lastReservationRestaurant ? 'highlight' : ''}`}>
            <Link to={`/Reservation/${restaurant.id}`}>
              <img 
                src={restaurant.image || coverImage} 
                alt={restaurant.name} 
                className="restaurant-logo"
                onError={(e) => { e.target.onerror = null; e.target.src = coverImage; }}
              />
            </Link>
            <div className="restaurant-info">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <p className="restaurant-location">{restaurant.location}</p>
              <p className="restaurant-description">{restaurant.description}</p>
              {restaurant.name === lastReservationRestaurant && (
                <p className="new-reservation-notice">Click to view your new reservation details</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Formik
        initialValues={{ name: '', location: '', description: '', image: '' }}
        validationSchema={validationSchema}
        onSubmit={handleAddRestaurant}
      >
        {({ errors, touched, isValid }) => (
          <Form className="restaurant-form">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <Field name="name" placeholder="Restaurant Name" className="form-input" />
            <ErrorMessage name="name" component="div" className="error-message" />

            <Field name="location" placeholder="Location" className="form-input" />
            <ErrorMessage name="location" component="div" className="error-message" />

            <Field name="description" placeholder="Description" className="form-input" />
            <ErrorMessage name="description" component="div" className="error-message" />

            <Field name="image" placeholder="Image URL" className="form-input" />
            <ErrorMessage name="image" component="div" className="error-message" />

            <button type="submit" className="add-button" disabled={isSubmitting || !isValid}>
              {isSubmitting ? 'Adding...' : 'Add Restaurant'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Restaurants;