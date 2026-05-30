import React from "react";
import "./RecipeList.css";

export default function RecipeList({
                                       recipes, onSelect = () => {
    }
                                    }) {

    return (
        <div className="wrapper-list">
            <h2 className="wrapper-list-title">Recettes</h2>
            <ul className="grid grid-cols-3 gap-10 pt-10">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="col-span-1" onClick={() => onSelect(recipe.id)}>
                        <div className="wrapper-list-card">
                            <h4 className="wrapper-list-card-title">
                                {recipe.title}
                            </h4>
                            <p className="wrapper-list-card-description">{recipe.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


