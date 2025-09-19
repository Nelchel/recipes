import RecipeForm from "../../components/RecipeForm/RecipeForm";
import React from "react";

export default function AddRecipe({addRecipe}) {
    return (
        <section className="py-16">
            <div className="max-w-7xl m-auto">
                <h2 className="text-5xl text-white py-12">Ajouter une recette</h2>
                <RecipeForm addRecipe={addRecipe} />
            </div>
        </section>
    )
}
