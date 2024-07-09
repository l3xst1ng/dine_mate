from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from models import db, Restaurant,Customer ,Reservation, ReservationTable,Table




app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dine_mate.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

CORS(app)




if __name__ == "__main__":
    app.run(port=5555, debug=True)