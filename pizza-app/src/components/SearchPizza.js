import React from "react";

function SearchPizza ({pizzaSearchTerm,  onPizzaSearchChange}) {

    return (
        <div className="searchbar">
      <label htmlFor="pizzaSearch"> Search Pizza: </label>
      <input
        type="text"
        id="pizzaSearch"
        placeholder="Type a pizza name to search..."
        value={pizzaSearchTerm}
        onChange={(e) => onPizzaSearchChange(e.target.value)}
      />
        </div>
    )
}

export default SearchPizza;