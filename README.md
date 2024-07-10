# DineMate - Restaurant Reservation System

DineMate is a digital reservation system designed to streamline the booking process for restaurants, aiming to eliminate double bookings, manage tables efficiently, and accommodate special requests effectively. This README provides an overview of the project structure, detailing key files, functions, and their purposes.

## Introduction

Many restaurants face challenges with managing reservations effectively using traditional methods. DineMate addresses these issues by providing a user-friendly digital solution that enhances customer satisfaction, reduces staff stress, and optimizes seating capacity. The system allows users to create, view, modify, and delete reservations seamlessly.

## Files Overview

### `app.py`

This file serves as the main entry point for the Flask application. It initializes the Flask app, configures routes, and connects to the database.
- **Reservation Management**: Routes for creating, reading, updating, and deleting reservations.
- **Table Management**: Routes for viewing available tables, adding new tables.


### `models.py`

The `models.py` file defines the database models used in the application. Key models include:

- **Customer**: Stores information about customers such as name, email, and contact details.
- **Reservation**: Manages reservations with attributes like reservation time, number of guests, and associated table.
- **Table**: Represents restaurant tables with attributes like table ID and capacity.
- **Restaurant**: Contains information about the restaurant, which can be expanded based on specific needs.
- **ReservationTable**: Handles the relationship between reservations and tables, ensuring bookings are correctly linked to available seating.

model includes methods for CRUD operations and relationships to ensure data integrity.




## Routes

### `/create_reservation`

Allows users to create a new reservation by specifying the date, time, and number of guests. Validates availability and assigns an appropriate table based on capacity.

### `/reservation`

Displays all existing reservations made through the system, providing details like reservation time, customer information, and table assignment.

### `/reservation/<reservation_id>`

Enables users to modify an existing reservation identified by `reservation_id`, allowing changes to reservation details or table assignment.


## Models

### Customer Model

Stores information about customers, including name, email, and contact details.

### Reservation Model

Manages reservations with attributes such as reservation time, number of guests, and linked table ID.

### Table Model

Represents restaurant tables with attributes like table ID and capacity, essential for managing seating arrangements.

### Restaurant Model

Contains additional details about the restaurant, supporting operations specific to the establishment.

### ReservationTable Model

Establishes the relationship between reservations and tables, ensuring bookings are correctly linked to available seating.

## Installation Instructions
1. Clone the repository:
    git clone https://github.com/l3xst1ng/dine_mate

2. Navigate to the project directory:
    
    cd client
    npm install --save

3. Navigate to the project directory:
    
    cd server
    pipenv install
    pipenv shell

## Entity-Relationship Diagram (ERD)

The following diagram shows the relationships between the tables

![ERD](/Screenshot%20from%202024-07-10%2015-00-30.png)


## Technologies Used
- Flask
- SQLAlchemy
- flask-migrate 
- sqlalchemy-serializer
- flask-cors

### Author
- Nganga, Purity
- Ahmed Mohamed
- Martin, Hann
- Victor Ngugi
- Githinji, Kelvin
- Kinyua, Michelle


### License
[MIT License](LICENSE)
The content of this site is licensed under the MIT license.
Copyright (c) 2024.
