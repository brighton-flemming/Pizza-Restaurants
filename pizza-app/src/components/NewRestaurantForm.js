import { useState } from "react";

function NewRestaurant({ onAddRestaurant}){
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")


    function handleSubmit(e){
        e.preventDefault();
        fetch("/restaurants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name: name,
                address: address,
            }),
        })
        .then((r) => r.json())
        .then((newRestaurant) => onAddRestaurant(newRestaurant));
    }

    return (
        <div className="new-restaurant-form">
            <h2> New Restaurant (~ _ ~)</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="Restaurant Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input
                type="text"
                name="address"
                placeholder="Restaurant Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
                <button type="submit">Add Restaurant</button>
            </form>
        </div>
    );
}

export default NewRestaurant