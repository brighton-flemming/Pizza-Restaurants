import { useState } from "react";
import React from "react";

function NewRestaurantForm({ onAddRestaurant }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !address) {
      alert("Please fill out all fields.");
      setIsLoading(false);
      return;
    }

    fetch("/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
      }),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok.");
        }
        return r.json();
      })
      .then((newRestaurant) => {
        setIsLoading(false);
        onAddRestaurant(newRestaurant);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding Restaurant..." : "Add Restaurant"}
        </button>
      </form>
    </div>
  );
}

export default NewRestaurantForm;
