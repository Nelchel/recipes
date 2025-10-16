import RecipeForm from "../../components/RecipeForm/RecipeForm";
import React, {useState} from "react";
import RecipeList from "../../components/RecipeList/RecipeList";

export default function ListRecipe({addRecipe}) {
    const [recipes, setRecipes] = useState(() => {
        const stored = localStorage.getItem("recipes");
        return stored ? JSON.parse(stored) : [];
    });

    return (
        <section>
            <div className="max-w-7xl m-auto">
                <h2 className="text-5xl text-white py-12">Ajouter une recette</h2>
                <RecipeList recipes={recipes} />
            </div>
        </section>
    )
}
