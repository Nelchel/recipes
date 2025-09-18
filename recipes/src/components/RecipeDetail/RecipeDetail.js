import React from "react";

export default function RecipeDetail({ recipe, onClose, onDelete }) {
    return (
        <div className="recipe-detail">
            <h2>{recipe.title}</h2>
            <h3>Ingrédients</h3>
            <ul>
                {recipe.ingredients.split("\n").map((line, i) => (
                    <li key={i}>{line}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
            <button onClick={onDelete}>🗑 Supprimer</button>
            <button onClick={onClose}>Fermer</button>
        </div>
    );
}
