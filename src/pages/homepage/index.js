import {Link} from "react-router-dom";
import "./homepage.css";

export default function Homepage() {
    return (
        <main className="max-w-7xl m-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold">Bienvenue !</h1>
            <p className="mt-3 text-slate-600">Ajoute tes recettes via l’onglet Recettes.</p>


            <Link to="/recipes/add"><button className="add-button"><p className="text-white">Ajouter une recette</p></button></Link>
            <Link to="/recipes/list"><button className="add-button"><p className="text-white">Voir les recettes</p></button></Link>
        </main>
    )
}
