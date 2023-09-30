import { useEffect, useState } from "react";
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

  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    if (restaurantId) {
    fetch("/restaurants/${id}/pizzas")
      .then((r) => r.json())
      .then((pizzasArray) => {
        setPizzas(pizzasArray);
      });
    }
  }, [restaurantId]);

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
      (restaurant) => restaurant.id === id
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
        id: restaurants.id,
        name: updatedRestaurant.name,
        address: updatedRestaurant.address,
        pizzas: updatedRestaurant.pizzas,
        is_open: updatedRestaurant.is_open,
      };
      if (restaurant.id == updatedRestaurant.id) {
        return { ...restaurants, ...updatedRestaurant };
      } else {
        return restaurant;
      }
    });
    setRestaurants(updatedRestaurantsArray);
  };

  const updatedPizzasArray = pizzas.map((pizza) => {
    const updatedPizza = {
      id: pizzas.id,
      name: updatedPizza.name,
      ingredients: updatedPizza.ingredients,
    };
    if (pizza.id == updatedPizza.id) {
      return { ...pizzas, ...updatedPizza };
    } else {
      return pizza;
    }
  });
  setPizzas(updatedPizzasArray);
}

const displayedRestauarnts = restaurants.filter((restaurant) => {
  return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
});

return (
  <main>
    <NewPizzaForm onAddPizza={handleAddPizza} />
    <NewRestaurantForm onAddRestaurant={handleAddRestaurant} />
    <Search
      searchTerm={searchTerm}
      onPizzaSearchChange={setSearchTerm}
      onRestaurantSearchChange={setSearchTerm}
    />
    <RestaurantList
      restaurants={displayedRestaurants}
      handleUpdateRestaurant={handleUpdateRestaurant}
      handleDeleteRestaurant={handleDeleteRestaurant}
    />
  </main>
);
