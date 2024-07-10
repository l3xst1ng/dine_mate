import './BookReservationForm.css';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookReservationForm = () => {
  return (
    <div className="form-container">
      <h2>Book Reservation</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          restaurant: '',
          guests: '',
          specialRequests: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          email: Yup.string().email('Invalid email address').required('Email is required'),
          phone: Yup.string().required('Phone number is required'),
          date: Yup.date().required('Reservation date is required'),
          time: Yup.string().required('Reservation time is required'),
          restaurant: Yup.string().required('Restaurant selection is required'),
          guests: Yup.number().required('Number of guests is required').min(1, 'Must be at least 1 guest'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission logic here, e.g., send data to backend
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" placeholder="Your Name" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" placeholder="Your Email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field type="tel" id="phone" name="phone" placeholder="Your Phone Number" />
              <ErrorMessage name="phone" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <Field type="date" id="date" name="date" />
              <ErrorMessage name="date" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <Field type="time" id="time" name="time" />
              <ErrorMessage name="time" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="restaurant">Restaurant</label>
              <Field as="select" id="restaurant" name="restaurant">
                <option value="">Select a Restaurant</option>
                {/* Replace with actual restaurant options */}
                <option value="restaurant1">Restaurant 1</option>
                <option value="restaurant2">Restaurant 2</option>
                <option value="restaurant3">Restaurant 3</option>
              </Field>
              <ErrorMessage name="restaurant" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests</label>
              <Field type="number" id="guests" name="guests" placeholder="Number of Guests" />
              <ErrorMessage name="guests" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests</label>
              <Field as="textarea" id="specialRequests" name="specialRequests" placeholder="Special Requests" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookReservationForm;
