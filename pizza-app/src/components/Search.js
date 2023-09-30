function Search({ searchTerm, onRestaurantSearchChange, onPizzaSearchChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="restaurantSearch"> Search Restaurant:</label>
      <input
        type="text"
        id="restaurantSearch"
        placeholder="Type a restaurant name to search..."
        value={searchTerm}
        onChange={(e) => onRestaurantSearchChange(e.target.value)}
      />

      <label htmlFor="pizzaSearch"> Search Pizza:</label>
      <input
        type="text"
        id="pizzaSearch"
        placeholder="Type a pizza name to search..."
        value={searchTerm}
        onChange={(e) => onPizzaSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
