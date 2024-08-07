from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurant'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)

    reservations = db.relationship('Reservation', back_populates='restaurant', lazy=True)
    serialize_rules = ('-reservations',)

   

class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
 
    reservations = db.relationship('Reservation', back_populates='customer', lazy=True)
    serialize_rules = ('-reservations.customer',)



class Reservation(db.Model, SerializerMixin):
    __tablename__ = 'reservation'
    id = db.Column(db.Integer, primary_key=True)
    reservation_time = db.Column(db.Date, nullable=False)
    number_guests = db.Column(db.Integer,  nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)

    restaurant = db.relationship('Restaurant', back_populates='reservations')
    customer = db.relationship('Customer', back_populates='reservations')
    serialize_rules = ('-restaurant.reservations', '-customer.reservations',)
   



class ReservationTable(db.Model, SerializerMixin):
    __tablename__ = 'reservation_table'
    id = db.Column(db.Integer, primary_key=True)
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservation.id'), nullable=False)


    serialize_rules = ('-reservation',)
