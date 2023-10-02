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
           <h2>The fortunate appliaction that gets to satisfy your hunger {appname}</h2>
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
        
    @app.route('/restaurants', methods=['POST'])
    def add_restaurant():
        data = request.get_json()
        name = data.get('name')
        address = data.get('address')
        is_open = data.get('is_open')
        new_restaurant = Restaurant(name=name, address=address, is_open=is_open)
        db.session.add(new_restaurant)
        db.session.commit()
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
    def delete_restaurant(restaurant_id):
        restaurant = Restaurant.query.get(restaurant_id)
        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
            return jsonify({'message': 'Restaurant deleted successfully.'})
        else:
            return jsonify({'message': 'Restaurant not found.'})
    
    @app.route('/restaurants/<int:restaurant_id>/pizzas', methods=['GET'])
    def get_restaurant_pizzas(pizza_id):
        pizzas = Pizza.query.filter_by(pizza_id=pizza_id).all()
        pizzas_data = [{'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients} for pizza in pizzas]
        return jsonify(pizzas_data)
    
    @app.route('/pizzas>', methods=['POST'])
    def add_pizza():
        data = request.get_json()
        name = data.get('name')
        ingredients = data.get('ingredients')
        new_pizza = Pizza(name=name, ingredients=ingredients)
        db.session.add(new_pizza)
        db.session.commit()
        return jsonify({'message': 'Pizza added successfully.'})
    
    @app.route('/pizzas/<int:pizza_id>', methods=['PUT'])
    def update_pizza(pizza_id):
        data = request.get_json()
        new_name = data.get('name')
        new_ingredients = data.get('ingredients')

        pizza = Pizza.query.get(pizza_id)
        if pizza:
            pizza.name = new_name
            pizza.ingredients = new_ingredients
            db.session.commit()
            return jsonify({'message': 'Pizza updated successfully'})
        else:
            return jsonify({'message': 'Pizza not found.'})
        
    @app.route('/pizzas/<int:pizza_id>', methods=['DELETE'])
    def delete_pizza(pizza_id):
        pizza = Pizza.query.get(pizza_id)
        if pizza:
            db.session.delete(pizza)
            db.session.commit()
            return jsonify({'message': 'Pizza deleted successfully.'})
        else:
            return jsonify({'message': 'Pizza not found.'})
    
    @app.route('/restaurants/<int:restaurant_id>/pizzas/<int:pizza_id>', methods=['GET'])
    def get_restaurant_pizza( pizza_id):
        restaurant_pizza = RestaurantPizza.query.filter_by( pizza_id=pizza_id).first()
        if restaurant_pizza:
            return jsonify({'id': restaurant_pizza.id, 'restaurant_id': restaurant_pizza.restaurant_id, 'resturant_name': restaurant_pizza.restaurant_name,'pizza_id': restaurant_pizza.pizza_id, 'pizza_name': restaurant_pizza.pizza_name})
        else:
            return jsonify({'message': 'The Pizza you seek in the stated Restaurant is not found.'}), 404

    @app.route('/restaurants/<int:restaurant_id>/pizzas/<int:pizza_id>', methods=['POST'])
    def add_restaurant_pizza(restaurant_id):
        data = request.get_json()
        pizza_name =  data.get('pizza_name')
        pizza_id = data.get('pizza_id')
        restaurant_name = data.get('restaurant_name')
        price = data.get('price')

        new_restaurant_pizza = RestaurantPizza(restaurant_id=restaurant_id, restaurant_name=restaurant_name, pizza_id=pizza_id, pizza_name=pizza_name, price=price)
        db.session.add(new_restaurant_pizza)
        db.session.commit()
        return jsonify({'message': 'The Pizza has been added successfully to the stated Restaurant'})
   
    @app.route('/restaurants/<int:restaurant_id>/pizzas/<int:pizza_id>', methods=['DELETE'])
    def delete_restaurant_pizza(restaurant_id, pizza_id):
        restaurant_pizza = RestaurantPizza.query.filter_by(restaurant_id=restaurant_id, pizza_id=pizza_id)
        if restaurant_pizza:
            db.session.delete(restaurant_pizza)
            db.session.commit()
            return jsonify ({'message': 'The Pizza from the stated Restaurant has been deleted.'})
        else:
            return jsonify({'message': ' The Pizza you seek in the stated Restaurant is not found.'})
        
    
    return app

    