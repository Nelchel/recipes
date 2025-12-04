import React, {useEffect, useState} from "react";
import Nav from "./components/Nav/Nav";
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage";
import AddRecipe from "./pages/recipes/add/add";
import ListRecipe from "./pages/recipes/list";
import RecipeDetail from "./pages/recipes/detail";

function App() {
    const [recipes, setRecipes] = useState(() => {
        const stored = localStorage.getItem("recipes");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }, [recipes]);

    const addRecipe = (recipe) => setRecipes([...recipes, recipe]);

    return (
        <>
            <Nav/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/recipes/add" element={<AddRecipe addRecipe={addRecipe}/>}/>
                <Route path="/recipes/list" element={<ListRecipe/>}/>
                <Route path="/recipes/:id" element={<RecipeDetail/>}/>
            </Routes>
            {/*        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recettes" element={<RecipeForm />} />
          <Route path="/recettes/:id" element={<RecipeDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>*/}
            {/*        <div className="max-w-7xl m-auto">
          <RecipeList recipes={recipes} onSelect={setSelectedRecipe} />
          {selectedRecipe !== null && (
              <RecipeDetail
                  recipe={recipes[selectedRecipe]}
                  onClose={() => setSelectedRecipe(null)}
                  onDelete={() => deleteRecipe(selectedRecipe)}
              />
          )}
        </div>*/}
        </>
    );
}

export default App;
