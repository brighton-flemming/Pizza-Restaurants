from random import randint, choice

from app import db, app
from models import Restaurant, RestaurantPizza, Pizza

def seed_database():
     
     Restaurant.query.delete()
     RestaurantPizza.query.delete()
     Pizza.query.delete()

     def SeedingPizza():
         print("🍕 Seeding pizza...")
     SeedingPizza()

     pizza_data = [
     Pizza(name = "Magheritta", ingredients = "Tomato, Mozzarella, Basil"),
     Pizza(name = "Pepperoni", ingredients = "Pepperoni, Tomato, Mozzarella"),
     Pizza(name="Vegetarian", ingredients="Mushrooms, Bell Peppers, Olives, Tomatoes, Mozzarella"),
     Pizza(name="Hawaiian", ingredients="Ham, Pineapple, Tomato Sauce, Mozzarella"),
     Pizza(name="BBQ Chicken", ingredients="BBQ Chicken, Red Onions, Mozzarella, BBQ Sauce"),
     Pizza(name="Margherita Extra", ingredients="Buffalo Mozzarella, Tomato, Basil, Olive Oil"),
     Pizza(name="Meat Lover's", ingredients="Pepperoni, Sausage, Bacon, Ham, Tomato Sauce, Mozzarella"),
     Pizza(name="Mediterranean", ingredients="Feta Cheese, Olives, Sun-dried Tomatoes, Spinach, Mozzarella")
    ]
     
     pizzas = []
     for pizza_info in pizza_data:
        pizza = pizza_info  
        db.session.add(pizza) 
        pizzas.append(pizza)
     db.session.commit()
        
     def SeedingPizzaDone():
          print("🍕 Seeding pizza... Done!")
     SeedingPizzaDone()

     def SeedingRestaurants():
          print("🍕 Seeding restaurants")
     SeedingRestaurants()

     restaurant_data = [

     Restaurant(name= "Pizza Hut", address = "143 Elm Street", is_open = True),
     Restaurant(name="Cheesy Delights", address ="209 Dyke Ave", is_open = True),
     Restaurant(name="Slice of Heaven", address="88 Main Street", is_open=True),
     Restaurant(name="Pasta Palace", address="315 Olive Lane", is_open=False),
     Restaurant(name="The Pizzeria", address="42 Pepperoni Road", is_open=True),
     Restaurant(name="Crust & Co.", address="701 Doughnut Drive", is_open=True),
     Restaurant(name="Mamma Mia's", address="512 Tomato Avenue", is_open=False),
     Restaurant(name="The Cheesy Crust", address="124 Cheese Lane", is_open=True),
     Restaurant(name="Italian Bistro", address="325 Olive Lane", is_open=True),
     Restaurant(name="Pasta Palace", address="451 Main Street", is_open=False),
     Restaurant(name="Gourmet Pizzeria", address="708 Vineyard Road", is_open=True),
     Restaurant(name="Pizza Heaven", address="512 Pepperoni Avenue", is_open=True)

     ]

     restaurants = []
     for restaurant_info in restaurant_data:
        restaurant = restaurant_info  
        db.session.add(restaurant) 
        restaurants.append(restaurant)
     db.session.commit()
     
     def SeedingRestaurantsDone():
          print("🍕 Seeding restaurants... Done!")
     SeedingRestaurantsDone()

     def SeedingRestaurantPizza():
         print ("🍕 Adding pizza to restaurants...")
     SeedingRestaurantPizza()

     restaurant_pizza_data = [
     RestaurantPizza(restaurant_id = 1, restaurant_name="restaurant1", pizza_id = 1, pizza_name="pizza1", price=15),
     RestaurantPizza(restaurant_id = 2, restaurant_name="restaurant2", pizza_id = 2, pizza_name="pizza2", price=20),
     RestaurantPizza(restaurant_id = 3, restaurant_name="restaurant1", pizza_id = 3, pizza_name="pizza2", price=18),
     RestaurantPizza(restaurant_id = 4, restaurant_name="restaurant2", pizza_id = 4, pizza_name="pizza1", price=24),
     RestaurantPizza(restaurant_id=5, restaurant_name="Pizzeria Italia", pizza_id=5, pizza_name="Margherita", price=17),
     RestaurantPizza(restaurant_id=6, restaurant_name="Tony's Pizza Shack", pizza_id=6, pizza_name="Pepperoni Lover's", price=22),
     RestaurantPizza(restaurant_id=7, restaurant_name="Mama Mia Pizzeria", pizza_id=7, pizza_name="Vegetarian Delight", price=19),
     RestaurantPizza(restaurant_id=8, restaurant_name="Gourmet Pizza Co.", pizza_id=8, pizza_name="BBQ Chicken Feast", price=25)
     ]

    #  db.session.add(restaurant_pizza1) 
    #  db.session.add(restaurant_pizza2)
    #  db.session.add(restaurant_pizza3)
    #  db.session.add(restaurant_pizza4)
    #  db.session.add(restaurant_pizza5)
    #  db.session.add(restaurant_pizza6)
    #  db.session.add(restaurant_pizza7)
    #  db.session.add(restaurant_pizza8)
     restaurant_pizzas = []
     for restaurant_pizza_info in restaurant_pizza_data:
        restaurant_pizza = restaurant_pizza_info  
        db.session.add(restaurant_pizza) 
        restaurant_pizzas.append(restaurant_pizza)
     db.session.commit()
 

     def SeedingRestaurantPizzaDone():
         print ("🍕 Adding pizza to restaurants...")
     SeedingRestaurantPizzaDone()

     def SeedingDone():
         print("🍕 Data added successfully.")
     SeedingDone()

if __name__ =="__main__":
    with app.app_context():
        seed_database()



   

     

          