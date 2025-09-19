import React, { useState, useEffect } from "react";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import RecipeList from "./components/RecipeList/RecipeList";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import Nav from "./components/Nav/Nav";
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";

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
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recettes" element={<RecipeForm />} />
          <Route path="/recettes/:id" element={<RecipeDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
