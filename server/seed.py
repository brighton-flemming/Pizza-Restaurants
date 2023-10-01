from random import randint, choice

from app import db, create_app, app
from models import Restaurant, RestaurantPizza, Pizza

def seed_database():
     
     Restaurant.query.delete()
     RestaurantPizza.query.delete()
     Pizza.query.delete()

     def SeedingPizza():
         print("🍕 Seeding pizza...")
     SeedingPizza()

    
     pizza1 = Pizza(name = "Magheritta", ingredients = "Tomato, Mozzarella, Basil")
     pizza2 = Pizza(name = "Pepperoni", ingredients = "Pepperoni, Tomato, Mozzarella")
     
     db.session.add(pizza1, pizza2)
     db.session.commit()
        
     def SeedingPizzaDone():
          print("🍕 Seeding pizza... Done!")
     SeedingPizzaDone()

     def SeedingRestaurants():
          print("🍕 Seeding restaurants")
     SeedingRestaurants()

     restaurant1 = Restaurant(name= "Pizza Hut", address = "143 Elm Street", is_open ="True")
     restaurant2 = Restaurant(name="Cheesy Delights", address ="209 Dyke Ave", is_open = "True")

     db.session.add(restaurant1, restaurant2)
     db.session.commit()
     
     def SeedingRestaurantsDone():
          print("🍕 Seeding restaurants... Done!")
     SeedingRestaurantsDone()

     def SeedingRestaurantPizza():
         print ("🍕 Adding pizza to restaurants...")
     SeedingRestaurantPizza()

     restaurant_pizza1 = RestaurantPizza(restaurant=restaurant1, pizza=pizza1)
     restaurant_pizza2 = RestaurantPizza(restaurant=restaurant2, pizza=pizza2)
     restaurant_pizza3 = RestaurantPizza(restaurant=restaurant1, pizza=pizza2)
     restaurant_pizza4 = RestaurantPizza(restaurant=restaurant2, pizza=pizza1)

     db.session.add(restaurant_pizza1, restaurant_pizza2, restaurant_pizza3, restaurant_pizza4)
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



   

     

          