# Standard library imports

# Remote library imports
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, Restaurant,Customer ,Reservation, ReservationTable,Table




app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dine_mate.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


migrate = Migrate(app, db)
db.init_app(app)

CORS(app)

@app.route('/tables', methods=['GET', 'POST'])
def tables():
    if request.method == 'GET':
        tables = []
        for table in Table.query.all():
            table_dict = table.to_dict(rules=('-reservations',))
            tables.append(table_dict)
        response = make_response(
                tables, 200
            )
        return response
    
    elif request.method=='POST':
        new_table = Table(
            table_number = request.form.get("table_number"),
            capacity=request.form.get("capacity"),
        )
        db.session.add(new_table)
        db.session.commit()
        table_dict=new_table.to_dict()
        response=make_response(
            table_dict, 201
        )
        return response
    
@app.route('/restaurants', methods=['GET', 'POST'])
def restaurants():
    if request.method == 'GET':
        restaurants = []
        for restaurant in Restaurant.query.all():
            restaurant_dict = restaurant.to_dict(rules=('-reservations',))
            restaurants.append(restaurant_dict)
        response = make_response(
                restaurants, 200
            )
        return response
    
    elif request.method=='POST':
        new_restaurant = Restaurant(
            name = request.form.get("name"),
            location = request.form.get("location"),
        )
        db.session.add(new_restaurant)
        db.session.commit()
        restaurant_dict=new_restaurant.to_dict()
        response=make_response(
            restaurant_dict, 201
        )
        return response


if __name__ == "__main__":
    app.run(port=5555, debug=True)