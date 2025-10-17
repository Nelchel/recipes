import React from "react";

export default function RecipeList({ recipes, onSelect }) {

    return (
        <div className="pt-12">
            <h2 className="text-white text-5xl">Recettes</h2>
            <ul className="grid grid-cols-3 gap-10 pt-10">
                {recipes.map((recipe, index) => (
                    <li key={index} className="col-span-1" onClick={() => onSelect(index)}>
                        <p className="text-white text-2xl font-medium">
                            {recipe.title}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


