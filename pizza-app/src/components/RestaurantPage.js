import { useEffect, useState } from "react";
import React from "react";
import NewRestaurantForm from "./NewRestaurantForm";
import NewPizzaForm from "./NewPizzaForm";
import RestaurantList from "./RestaurantList";
import Search from "./Search";

function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([
    {
      id: null,
      name: "",
      address: "",
      pizzas: "",
      is_open: true,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/restaurants")
      .then((r) => r.json())
      .then((restaurantsArray) => {
        setRestaurants(restaurantsArray);
      });
  }, []);

  const [pizzas, setPizzas] = useState([
    {
        id: null,
        name:"",
        ingredients:"",
    },
  ]);

  useEffect(() => {
    if (restaurants.length > 0) {
        const restaurantId = restaurants[0].id;
    fetch(`/restaurants/${restaurantId}/pizzas`)
      .then((r) => r.json())
      .then((pizzasArray) => {
        setPizzas(pizzasArray);
      })
      .catch((error) => {
      console.error("Error fetching pizzas.", error) 
    })
    }
  }, [restaurants]);

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
  return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
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
    <Search
      searchTerm={searchTerm}
      onPizzaSearchChange={setSearchTerm}
      onRestaurantSearchChange={setSearchTerm}
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