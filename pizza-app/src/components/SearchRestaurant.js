import React from "react";

function SearchRestaurant({ restaurantSearchTerm ,  onRestaurantSearchChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="restaurantSearch"> Search Restaurant: </label>
      <input
        type="text"
        id="restaurantSearch"
        placeholder="Type a restaurant name to search..."
        value={restaurantSearchTerm}
        onChange={(e) => onRestaurantSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchRestaurant;
