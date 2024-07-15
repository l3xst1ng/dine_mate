import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Restaurants.css';
import { initialRestaurants } from '../data/restaurantData';
import { Link } from 'react-router-dom'

// Import all images
import serenityLogo from '../assets/images/Serenity.png';
import shawrysLogo from '../assets/images/Shawrieskitchen.png';
import bigBiteLogo from '../assets/images/bigbyte.png';
// Placeholder image
import coverImage from '../assets/images/Cover.png';

// object to map image filenames to their imported versions
const imageMap = {
  'Serenity.png': serenityLogo,
  'Shawries.png': shawrysLogo,
  'bigbyte.png': bigBiteLogo,
  
};

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Restaurant name is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().required('Image is required'),
  });

  const fetchRestaurants = async () => {  // Renamed for clarity
    try {
      const response = await fetch('https://dine-mate.onrender.com/restaurants');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleAddRestaurant = async (values, { resetForm }) => {
    try {
        console.log(values);
        const response = await fetch('https://dine-mate.onrender.com/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        if (!response.ok) {
            const errorData = await response.json(); 
            if (response.status === 400 && errorData.Message === 'Restaurant already exists') {
                throw new Error('Restaurant already exists');
            } else {
                throw new Error('Failed to add restaurant');
            }
        }
        const newRestaurant = await response.json();
        setRestaurants([...restaurants, newRestaurant]); 
        resetForm();
        fetchRestaurants();
        setSuccessMessage('Restaurant submitted successfully');
    } catch (error) {
        console.error('Error adding restaurant:', error.message); 
        if (error.message === 'Restaurant already exists') {
            setErrorMessage('Restaurant already exists');
        } else {
            setErrorMessage('Error adding restaurant');
        }
    }
};




  return (
    <div className="restaurant-container">
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <Link to={`/Reservation/${restaurant.id}`}>
              <img 
                src={imageMap[restaurant.image] || coverImage} 
                alt={restaurant.name} 
                className="restaurant-logo"
              />
            </Link>
            <div className="restaurant-info">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              <p className="restaurant-location">{restaurant.location}</p>
              <p className="restaurant-description">{restaurant.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Formik
        initialValues={{ name: '', location: '', description: '', image: '' }}
        validationSchema={validationSchema}
        onSubmit={handleAddRestaurant}
      >
        {({ errors, touched }) => (
          <Form className="restaurant-form">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <Field name="name" placeholder="Restaurant Name" className="form-input" />
            <ErrorMessage name="name" component="div" className="error-message" />

            <Field name="location" placeholder="Location" className="form-input" />
            <ErrorMessage name="location" component="div" className="error-message" />

            <Field name="description" placeholder="Description" className="form-input" />
            <ErrorMessage name="description" component="div" className="error-message" />

            <Field name="image" placeholder="Image filename" className="form-input" />
            <ErrorMessage name="image" component="div" className="error-message" />

            <button type="submit" className="add-button">Add Restaurant</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Restaurants;
