import Nav from "./components/Nav/Nav";
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage";
import AddRecipe from "./pages/recipes/add/add";
import ListRecipe from "./pages/recipes/list/list";
import RecipeDetail from "./pages/recipes/detail";

function App() {
    return (
        <>
            <Nav/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/recipes/add" element={<AddRecipe/>}/>
                <Route path="/recipes/list" element={<ListRecipe/>}/>
                <Route path="/recipes/:id" element={<RecipeDetail/>}/>
            </Routes>
        </>
    );
}

export default App;
