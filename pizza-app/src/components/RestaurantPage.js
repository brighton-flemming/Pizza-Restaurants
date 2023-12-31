import { useEffect, useState } from "react";
import React from "react";
import NewRestaurantForm from "./NewRestaurantForm";
import NewPizzaForm from "./NewPizzaForm";
import RestaurantList from "./RestaurantList";
import SearchPizza from "./SearchPizza";
import SearchRestaurant from "./SearchRestaurant";

function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "",
      address: "",
      pizzas: "",
      is_open: true,
    },
  ]);
  const [pizzaSearchTerm, setPizzaSearchTerm] = useState("");
  const [restaurantSearchTerm, setRestaurantSearchTerm] = useState("")
  const [pizzas, setPizzas] = useState([
    {
        id:1,
        name:"",
        ingredients:"", 
    },
  ]);
  

  useEffect(() => {
    fetch("/restaurants")
      .then((r) => r.json())
      .then((restaurantsArray) => {
        setRestaurants(restaurantsArray);
      });
  }, [restaurants]);


  useEffect(() => {
    if (restaurants && restaurants.length >= 1 && restaurants[1]) {
        const restaurant_id = restaurants[1].id;
    fetch(`/restaurants/${restaurant_id}/pizzas`)
      .then((r) => r.json())
      .then((pizzasArray) => {
        setPizzas(pizzasArray);
      })
      .catch((error) => {
      console.error("Error fetching pizzas.", error) 
    })
    }
  }, [restaurants, pizzas]);

  const handleAddRestaurant = (newRestaurant) => {
    const updatedRestaurantsArray = [...restaurants, newRestaurant];
    setRestaurants(updatedRestaurantsArray);
  };

  const handleAddPizza = (newPizza) => {
    const updatedPizzasArray = [...pizzas, newPizza];
    setPizzas(updatedPizzasArray);
  };

  const handleDeleteRestaurant = (id) => {
    const updatedRestaurantsArray = restaurants.filter(
      (restaurant) => restaurant.id !== id
    );
    setRestaurants(updatedRestaurantsArray);
  };

  const handleUpdateRestaurant = (updatedRestaurant) => {
    if (!updatedRestaurant || !updatedRestaurant.id) {
      console.error("Invalid updated restaurant or missing id");
      return;
    }
    

    const updatedRestaurantsArray = restaurants.map((restaurant) => {
      const updatedRestaurant = {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        pizzas: restaurant.pizzas,
        is_open: restaurant.is_open,
      };
      if (restaurant.id === updatedRestaurant.id) {
        return { ...restaurants, ...updatedRestaurant };
      } else {
        return restaurant;
      }
    });
    setRestaurants(updatedRestaurantsArray);
   };

   useEffect(() => {
   const updatedPizzasArray = pizzas.map((pizza) => {
    const updatedPizza = {
      id: pizza.id,
      name: pizza.name,
      ingredients: pizza.ingredients,
    };
    if (pizza.id === updatedPizza.id) {
      return { ...pizzas, ...updatedPizza };
    } else {
      return pizza;
    }
  });
  setPizzas(updatedPizzasArray);
}, [pizzas])
 

const displayedRestaurants = restaurants.filter((restaurant) => {
  return restaurant.name.toLowerCase().includes(restaurantSearchTerm.toLowerCase());
  });

  return (
  <main className="container">
    <div className="form-container">
    <NewPizzaForm onAddPizza={handleAddPizza} />
    </div>
    <div className="form-container">
      <NewRestaurantForm onAddRestaurant={handleAddRestaurant} />
      </div>
    <div className="search-container">
    <SearchRestaurant
      searchTerm={restaurantSearchTerm}
      onRestaurantSearchChange={setRestaurantSearchTerm}
    />
    </div>
    <div className="search-container">
      <SearchPizza
      searchTerm={pizzaSearchTerm}
      onPizzaSearchChange={setPizzaSearchTerm}
       />
    </div>
    <RestaurantList
      restaurants={displayedRestaurants}
      handleUpdateRestaurant={handleUpdateRestaurant}
      handleDeleteRestaurant={handleDeleteRestaurant}
    />
  </main>
 );
  }

export default RestaurantPage;