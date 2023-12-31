import RestaurantCard from "./RestaurantCard";
import React from "react";

function RestaurantList({
  restaurants,
  handleUpdateRestaurant,
  handleDeleteRestaurant,
}) {
  return (
    <ul className="cards">
      {restaurants.map((restaurant) => {
        return (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            handleUpdateRestaurant={handleUpdateRestaurant}
            handleDeleteRestaurant={handleDeleteRestaurant}
          />
        );
      })}
    </ul>
  );
}

export default RestaurantList;
