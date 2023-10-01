from flask import Flask, current_app, make_response, request, jsonify, g
from models import db, Restaurant, Pizza, RestaurantPizza
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)

    @app.before_request
    def app_path():
        g.path = os.path.abspath(os.getcwd())
    
    @app.route('/', methods=['GET'])
    def index():
        hoster = request.headers.get('Host')
        appname = current_app.name
        response_body = f'''
           <h1>The hungriest customer of the day is {hoster}</h1>
           <h2>The fortunate appliaction that gest to satosfy your hunger {appname}</h2>
           <h3>How we got here you ask? Here's the answer {g.path}</h3>
        '''

        status_code = 200
        headers = {}

        return make_response(response_body, status_code, headers)
    
    @app.route('/restaurants', methods=['GET'])
    def get_restaurants():
        restaurants =  Restaurant.query.all()
        restaurants_data = [{'id': restaurant.id, 'name': restaurant.name, "address": restaurant.address, "is_open": restaurant.is_open} for restaurant in restaurants]
        return jsonify(restaurants_data)
    
    @app.route('restaurants', methods=['POST'])
    def add_restaurant():
        data = request.get_json()
        name = data.get('name')
        address = data.get('address')
        is_open = data.get('is_open')
        new_restaurant = Restaurant(name=name, address=address, is_open=is_open)
        db.session.add(new_restaurant)
        db.sesion.commit()
        return jsonify({'message': 'Restaurant added successfully.'})
    
    @app.route('/restaurants/<int:restaurant_id>', methods=['PUT'])
    def update_restaurant(restaurant_id):
        data = request.json()
        new_name = data.get('name')
        new_address = data.get('address')
        new_is_open = data.get('is_open')

        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant:
            restaurant.name = new_name
            restaurant.address = new_address
            restaurant.is_open = new_is_open
            db.session.commit()
            return jsonify({'message': 'Restaurant updated successfully'})
        else:
            return jsonify({'message': ' Restaurant not found.'})
    
    @app.route('/restaurants/<int:restaurant_id>', methods=['DELETE'])
    def delele_restaurant(restaurant_id):
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
            return jsonify({'message': 'Restaurant deleted successfully.'})
        else:
            return jsonify({'message': 'Restaurant not found.'})
    
    @app.route('/restaurants/<int:restaurant_id>/pizzas', methods=['GET'])
    def get_restaurant_pizzas(restaurant_id):
        pizzas = Pizza.query.filter_by(restaurant_id=restaurant_id).all()
        pizzas_data = [{'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients} for pizza in pizzas]
        return jsonify(pizzas_data)

    