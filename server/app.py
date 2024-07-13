# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import datetime
from models import db, Restaurant, Customer, Reservation, ReservationTable

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dine_mate_3hmx_user:ZdJtURJw7t35cd1sdssy6tCcJ39xKNy1@dpg-cq9dlrbv2p9s73ci1380-a.oregon-postgres.render.com/dine_mate_3hmx'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

CORS(app)

with app.app_context():
    db.create_all()



@app.route('/restaurants', methods=['GET', 'POST'])
def restaurants():
    if request.method == 'GET':
        restaurants = []
        for restaurant in Restaurant.query.all():
            restaurant_dict = restaurant.to_dict(rules=('-reservations',))
            restaurants.append(restaurant_dict)
        if len(restaurants) == 0:
            return jsonify({"Message": "There are no restaurants"})
        else:
            return make_response(
                    jsonify(restaurants), 200
                )
    
    elif request.method=='POST':
        data = request.get_json()

        new_restaurant = Restaurant(
            name = data.get("name"),
            location = data.get("location")
        )
        db.session.add(new_restaurant)
        db.session.commit()
        return jsonify({"Message": "Restaurant added successfuly"})
    

# creating reservation
@app.route('/create_reservation', methods=['POST'])
def create_reservation():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    contact = data.get('contact')
    reservation_time_str = data.get('reservation_time')
    number_guests = data.get('number_guests')
    table_id = data.get('table_id')

    reservation_time = datetime.strptime(reservation_time_str, '%Y-%m-%d')

    customer = Customer(name=name, email=email, contact=contact)
    db.session.add(customer)
    db.session.commit()

    reservation = Reservation(
        reservation_time=reservation_time,
        number_guests=number_guests,
        customer_id=customer.id,
        restaurant_id=1,
        table_id=table_id
    )
    db.session.add(reservation)
    db.session.commit()

    reservation_table = ReservationTable(
        reservation_id=reservation.id,
        table_id=table_id
    )
    db.session.add(reservation_table)
    db.session.commit()

    return jsonify({'message': 'Reservation created successfully'}), 201



# updating reservation
@app.route('/reservation/<int:id>', methods=['PUT'])
def update_reservation(id):
    data = request.get_json()
    reservation = Reservation.query.filter_by(id=id).first()

    if reservation is None:
        return jsonify({'message': 'Reservation not found'}), 404

    if 'name' in data:
        reservation.customer.name = data['name']
    if 'email' in data:
        reservation.customer.email = data['email']
    if 'contact' in data:
        reservation.customer.contact = data['contact']
    if 'reservation_time' in data:
        reservation.reservation_time = datetime.strptime(data['reservation_time'], '%Y-%m-%d')
    if 'number_guests' in data:
        reservation.number_guests = data['number_guests']
    if 'table_id' in data:
        reservation.table_id = data['table_id']

    db.session.commit()

    return jsonify({'message': 'Reservation updated successfully'}), 200




# getting reservation by id
@app.route('/reservation/<int:id>', methods=['GET'])
def get_reservation(id):
    reservation = Reservation.query.filter_by(id=id).first()
    if reservation is None:
        return jsonify({'message': 'Reservation not found'}), 404

    serialized_reservation = reservation.to_dict()
    return jsonify(serialized_reservation), 200



# getting reservation by a restaurant id
@app.route('/restaurant/<int:id>', methods=['GET'])
def get_restaurant_reservations(id):
    restaurant = Restaurant.query.filter_by(id=id).first()
    if restaurant is None:
        return jsonify({'message': 'Restaurant not found'}), 404

    reservations = [reservation.to_dict() for reservation in restaurant.reservations]
    return jsonify(reservations), 200



# deleting reservation
@app.route('/reservation/<int:id>', methods=['DELETE'])
def delete_reservation(id):
    reservation = Reservation.query.filter_by(id=id).first()
    if reservation is None:
        return jsonify({'message': 'Reservation not found'}), 404
    
    ReservationTable.query.filter_by(reservation_id=reservation.id).delete()
    
    db.session.delete(reservation)
    db.session.commit()
    
    return jsonify({'message': 'Reservation deleted successfully'}), 200



if __name__ == "__main__":
    app.run(port=5555, debug=True)
