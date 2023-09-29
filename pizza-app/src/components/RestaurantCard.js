import { useState } from "react";

function RestaurantCard({ restaurant, handleUpdateRestaurant, handleDeletePlant}){
    const {id, name, address, pizzas} = restaurant;
    const [updatedAddress, setUpdatedAddress] = useState(address)
    const [updatedPizzas, setUpdatedPizzas] = useState(pizzas)

    
    const handleClick = async () => {
        const response = await fetch(`restaurants/${id}/toggleStatus`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const updatedRestaurant = {...restaurant, is_open: !restaurant.is_open}
            handleUpdateRestaurant(updatedRestaurant)
        }
    }
    const handleUpdate = async (updatedRestaurant) => {
        const response = await fetch(`/restaurants/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRestaurant),
        });
        
        if (response.ok){
            handleUpdateRestaurant(updatedRestaurant);
        }
    };

    const handlePizzaUpdate = async (updatedPizzas) => {

        const response = await fetch(`/restaurants/${id}/pizzas`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPizzas),
        });

        if (response.ok) {
            setUpdatedPizzas(updatedPizzas);
        }
    };

    const handleAddressChange = (e) => {
        setUpdatedAddress(e.target.value);
    };

    const handlePizzaChange = (e) => {}

    const handleDeleteClick = async () => {
        const response = await fetch(`/restaurants/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            handleDeleteRestaurant(id);
            alert("Deleted Successfully 🍕");
        }
    };

    return (
        <div className="card">
            <h4>{name}</h4>
            <p>Address: {address}</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="New Address..." value={updatedAddress} onChange={handleAddressChange}/>
                <button onClick={() => handleUpdate({...restaurant, address: updatedAddress, pizzas:updatedPizzas})}>
                    Update Address
                </button>
                <ul>
                   {updatedPizzas.map((pizza, index) => (
                    <li key={index}>
                        <input type="text" value={pizza.name} onChange={(e) => handlePizzaChange(e, index)} />
                        <input type="text" value={pizza.ingredients} onChange={(e) => handlePizzaChange(e, index)} />
                    </li>
                   ))} 
                </ul>
                <button onClick={() => handlePizzaUpdate(updatedPizzas)}>Update Pizzas </button>
            </form>
            <div className="btn-group">
                {restaurant.is_open ? (
                    <button className="primary" onClick={handleClick}>
                        Open
                    </button>
                ):(
                    <button onClick={handleClick}>
                        Close
                    </button>
                )}
               <button onClick={handleDeleteClick}>
                Delete
               </button>
            </div>
        </div>
    );
}

export default RestaurantCard;