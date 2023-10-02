from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

class Restaurant(db.Model):
    __tablename__ =  'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    address = db.Column(db.String(300), nullable=False)
    is_open = db.Column(db.Boolean)

    restaurant_pizzas = db.relationship('RestaurantPizza', backref='restaurant_entries', lazy=True)
    pizzas = db.relationship('RestaurantPizza', back_populates='restaurant')

    def __repr__(self):
        return f"Restaurant: {self.name}/n, Address: {self.address}/n, Open: {self.is_open} "

class RestaurantPizza(db.Model):
    __tablename__= 'restaurant_pizza'

    id = db.Column(db.Integer, primary_key=True)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
    restaurant_name = db.Column(db.String, nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizzas.id'), nullable=False)
    pizza_name = db.Column(db.String,  nullable=False)
    price = db.Column(db.Integer, nullable=False)

    restaurant = db.relationship('Restaurant', backref='restaurant_pizza_entries', foreign_keys=[restaurant_id], lazy=True)
    pizza = db.relationship('Pizza', backref='pizza_restaurant_entries', foreign_keys=[pizza_id], lazy=True)

    @validates('price')
    def validate_price(self, key, value):
        if not (1 <= value <= 30):
            raise ValueError("Price of a pizza must be between 1 and 30 euros.")
        return value

class Pizza(db.Model):
    __tablename__ = 'pizzas'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), nullable=False)
    ingredients = db.Column(db.String(300), nullable=False)

    pizza_restaurants = db.relationship('RestaurantPizza', backref='pizza_entries', lazy=True)
    restaurants = db.relationship('RestaurantPizza', back_populates='pizza')

    def __repr__(self):
        return f"Pizza: {self.name}, Ingredients: {self.ingredients}"

