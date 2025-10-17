import React from "react";
import "./RecipeList.css";

export default function RecipeList({ recipes, onSelect = () => {} }) {

    return (
        <div className="pt-12">
            <h2 className="text-white text-5xl">Recettes</h2>
            <ul className="grid grid-cols-2 gap-10 pt-10">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="col-span-1" onClick={() => onSelect(recipe.id)}>
                        <div className="recipe-grid">
                            <p className="text-white text-2xl font-medium">
                                {recipe.title}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


