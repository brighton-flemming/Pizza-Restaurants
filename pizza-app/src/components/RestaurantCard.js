import { useState } from "react";

function RestaurantCard({ restaurant, handleUpdateRestaurant, handleDeleteRestaurant}){
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
    const handleUpdate = async () => {
        if(!updatedAddress.trim()) {
            alert("Address cannot be empty.")
            return;
        }
        const response = await fetch(`/restaurants/${restaurant.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ address: updatedAddress, pizzas: updatedPizzas}),
        });
        
        if (response.ok){
            const updatedRestaurant = {...restaurant, address: updatedAddress}
            handleUpdateRestaurant(updatedRestaurant);
        }else{
            console.error("Failed to update restaurant.")
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

    const handlePizzaNameChange = (e) => {
        const newPizzas = [...updatedPizzas];
        newPizzas[index].name = e.target.value;
        setUpdatedPizzas(newPizzas);
    }

    const handlePizzaIngredientsChange = (e) => {
        const newPizzas = [...updatedPizzas];
        newPizzas[index].ingredients = e.target.value;
        setUpdatedPizzas(newPizzas)
    }

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
                <button onClick={() => handleUpdate(updatedAddress)}>
                    Update Address
                </button>
                <ul>
                   {updatedPizzas.map((pizza, index) => (
                    <li key={index}>
                        <input type="text" value={pizza.name} onChange={(e) => handlePizzaNameChange(e, index)} />
                        <input type="text" value={pizza.ingredients} onChange={(e) => handlePizzaIngredientsChange(e, index)} />
                    </li>
                   ))} 
                </ul>
                <button onClick={() => handlePizzaUpdate(updatedPizzas)}> 
                Update Pizza 
                </button>
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