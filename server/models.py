from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Restaurant(db.Model):
    __tablename__ =  'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    address = db.Column(db.String(300), nullable=False)
    is_open = db.Column(db.Boolean)

    restaurant_pizzas = db.relationship('RestaurantPizza', backref='restaurant', lazy=True)
    pizzas = db.relationship('RestaurantPizza', back_populates='restaurant')

class RestaurantPizza(db.Model):
    __tablename__= 'restaurant_pizza'

    id = db.Column(db.Integer, primary_key=True)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
    restaurant_name = db.Column(db.String, db.ForeignKey('restaurants.name'), nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizzas.id'), nullable=False)
    pizza_name = db.Column(db.Integer, db.ForeignKey('pizzas.name'), nullable=False)

    restaurant = db.relationship('Restaurant', backref='restaurant_pizzas', lazy=True)
    pizza = db.relationship('Pizza', backref='pizza_restaurants', lazy=True)

class Pizza(db.Model):
    __tablename__ = 'pizzas'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    ingredients = db.Column(db.String(300), nullable=False)

    pizza_restaurants = db.relationship('RestaurantPizza', backref='pizza', lazy=True)
    restaurants = db.relationship('RestaurantPizza', back_populates='pizza')

