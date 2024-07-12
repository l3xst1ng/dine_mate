import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Restaurants.css';
import { initialRestaurants } from '../data/restaurantData';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState(initialRestaurants);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Restaurant name is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  });

  const handleAddRestaurant = (values, { resetForm }) => {
    const newRestaurant = {
      id: restaurants.length + 1,
      ...values,
      // Note To All: description and image are included here but won't be stored in our database
    };
    setRestaurants([...restaurants, newRestaurant]);
    resetForm();
  };

  return (
    <div className="restaurant-container">
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <img 
              src={restaurant.image} 
              alt={restaurant.name} 
              className="restaurant-logo"
              onError={(e) => {e.target.onerror = null; e.target.src = '../assets/images/Cover.png'}}
            />
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
            <Field name="name" placeholder="Restaurant Name" className="form-input" />
            <ErrorMessage name="name" component="div" className="error-message" />

            <Field name="location" placeholder="Location" className="form-input" />
            <ErrorMessage name="location" component="div" className="error-message" />

            <Field name="description" placeholder="Description" className="form-input" />
            <ErrorMessage name="description" component="div" className="error-message" />

            <Field name="image" placeholder="Image URL" className="form-input" />
            <ErrorMessage name="image" component="div" className="error-message" />

            <button type="submit" className="add-button">Add Restaurant</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Restaurants;