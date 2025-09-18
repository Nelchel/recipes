import React, { useState } from "react";

export default function RecipeForm({ addRecipe }) {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addRecipe({ title, ingredients, instructions });
        setTitle("");
        setIngredients("");
        setInstructions("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter une recette</h2>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nom"
                required
            />
            <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Ingrédients (un par ligne)"
                required
            />
            <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Instructions"
                required
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}
