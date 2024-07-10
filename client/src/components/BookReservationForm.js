// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const ReservationSchema = Yup.object().shape({
//   name: Yup.string().required('Required'),
//   email: Yup.string().email('Invalid email').required('Required'),
//   contact: Yup.string().required('Required'),
//   numberOfGuests: Yup.number().positive().integer().required('Required'),
//   restaurantName: Yup.string().required('Required'),
//   location: Yup.string().required('Required'),
//   tableNumber: Yup.number().positive().integer().required('Required'),
//   tableCapacity: Yup.number().positive().integer().required('Required')
// });

// function ReservationForm() {
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const response = await fetch('/api/reservations', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(values)
//       });
//       const data = await response.json();
//       // Handle successful reservation
//       console.log(data);
//     } catch (error) {
//       // Handle error
//       console.error('Error:', error);
//     }
//     setSubmitting(false);
//   };

//   return (
//     <Formik
//       initialValues={{
//         name: '',
//         email: '',
//         contact: '',
//         numberOfGuests: 1,
//         restaurantName: '',
//         location: '',
//         tableNumber: '',
//         tableCapacity: ''
//       }}
//       validationSchema={ReservationSchema}
//       onSubmit={handleSubmit}
//     >
//       <Form>
//         <Field name="name" type="text" placeholder="Name" />
//         <ErrorMessage name="name" component="div" />

//         <Field name="email" type="email" placeholder="Email" />
//         <ErrorMessage name="email" component="div" />

//         <Field name="contact" type="text" placeholder="Contact" />
//         <ErrorMessage name="contact" component="div" />

//         <Field name="numberOfGuests" type="number" placeholder="Number of Guests" />
//         <ErrorMessage name="numberOfGuests" component="div" />

//         <Field name="restaurantName" type="text" placeholder="Restaurant Name" />
//         <ErrorMessage name="restaurantName" component="div" />

//         <Field name="location" type="text" placeholder="Location" />
//         <ErrorMessage name="location" component="div" />

//         <Field name="tableNumber" type="number" placeholder="Table Number" />
//         <ErrorMessage name="tableNumber" component="div" />

//         <Field name="tableCapacity" type="number" placeholder="Table Capacity" />
//         <ErrorMessage name="tableCapacity" component="div" />

//         <button type="submit">Make Reservation</button>
//       </Form>
//     </Formik>
//   );
// }

// export default ReservationForm;