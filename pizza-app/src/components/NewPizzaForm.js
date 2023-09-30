import { useState } from "react";

function NewPizzaForm({ onAddPizza }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [isLoading, setIsLoading] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !ingredients) {
      alert("Please fill out all fields");
      setIsLoading(false);
      return;
    }

    fetch("/pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        ingredients: ingredients,
      }),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((newPizza) => {
        setIsLoading(false);
        onAddPizza(newPizza);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }

  return (
    <div className="new-pizza-form">
      <h2>New Pizza (* _ *)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Pizza Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Pizza Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding Pizza..." : "Add Pizza"}
        </button>
      </form>
    </div>
  );
}

export default NewPizzaForm;
