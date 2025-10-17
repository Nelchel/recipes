import { useParams } from "react-router-dom";
import { db } from "../../firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import {useEffect, useState} from "react";

export default function RecipeDetail() {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const docRef = doc(db, "recipes", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRecipe({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setErr("Recette introuvable.");
                }
            } catch (error) {
                console.error(error);
                setErr("Erreur lors du chargement de la recette.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    console.log(recipe)

    return (
        <div className="max-w-7xl m-auto pt-12">
            {!loading && (
                <div>
                    <p className="text-white text-5xl">{recipe.title}</p>
                    <p className="text-white pt-6 pb-10">{recipe.description}</p>
                </div>
            )}
        </div>
    )
}
