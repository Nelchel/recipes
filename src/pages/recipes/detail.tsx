import { useParams } from "react-router-dom";
import { db } from "../../firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import {useEffect, useState} from "react";

interface Recipe {
    id: string;
    title: string;
    description: string;
    [key: string]: unknown;
}

export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>();

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchRecipe = async () => {
            try {
                const docRef = doc(db, "recipes", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRecipe({ id: docSnap.id, ...docSnap.data() } as Recipe);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return null;

    return (
        <div className="max-w-7xl m-auto pt-12">
            {!loading && (
                <div>
                    <p className="text-white text-5xl">{recipe.title}</p>
                    <p className="text-white pt-6 pb-10">{recipe.description}</p>
                </div>
            )}
        </div>
    );
}
