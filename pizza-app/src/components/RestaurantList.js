import RestaurantCard from "./RestaurantCard";

function RestaurantList({
  resataurants,
  handleUpdateRestaurant,
  handleDeleteRestaurant,
}) {
  return (
    <ul className="cards">
      {resataurants.map((resataurant) => {
        return (
          <RestaurantCard
            key={resataurant.id}
            handleUpdateRestaurant={handleUpdateRestaurant}
            handleDeleteRestaurant={handleDeleteRestaurant}
          />
        );
      })}
    </ul>
  );
}

export default RestaurantList;
