import React, { useState, useEffect } from "react";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import RecipeList from "./components/RecipeList/RecipeList";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import Nav from "./components/Nav/Nav";

function App() {
  const [recipes, setRecipes] = useState(() => {
    const stored = localStorage.getItem("recipes");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => setRecipes([...recipes, recipe]);
  const deleteRecipe = (index) => {
    const newRecipes = [...recipes];
    newRecipes.splice(index, 1);
    setRecipes(newRecipes);
    setSelectedRecipe(null);
  };

  return (
      <>
      <Nav />
        <div className="max-w-7xl m-auto">
          <RecipeForm addRecipe={addRecipe} />
          <RecipeList recipes={recipes} onSelect={setSelectedRecipe} />
          {selectedRecipe !== null && (
              <RecipeDetail
                  recipe={recipes[selectedRecipe]}
                  onClose={() => setSelectedRecipe(null)}
                  onDelete={() => deleteRecipe(selectedRecipe)}
              />
          )}
        </div>
      </>
  );
}

export default App;
