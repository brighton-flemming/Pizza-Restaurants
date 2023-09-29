import { useState } from "react";

function NewPizzaForm({ onAddPizza }) {
    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/pizza", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                ingredients: ingredients,
            }),
        })
        .then((r) => r.json())
        .then((newPizza) => onAddPizza(newPizza));
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
                <button type="submit">Add Pizza</button>
            </form>
        </div>
    )

}

export default NewPizzaForm