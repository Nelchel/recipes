import React from "react";

export default function RecipeList({ recipes, onSelect }) {
    return (
        <div>
            <h2>📋 Recettes</h2>
            <ul>
                {recipes.map((recipe, index) => (
                    <li key={index} onClick={() => onSelect(index)}>
                        {recipe.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
