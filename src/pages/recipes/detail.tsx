import { useParams } from "react-router-dom";
import { db } from "../../firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import {useEffect, useState} from "react";
import styles from "./detail.module.scss";

interface Ingredient {
    name: string;
    qty: string;
    unit: string;
}

interface Recipe {
    id: string;
    title: string;
    description: string;
    ingredients: Ingredient[];
    steps: string[];
    prepTime: string;
    cookTime: string;
    servings: string;
    tags: string[];
    imageUrl: string | null;
}

export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>();

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            setError("Recette introuvable.");
            setLoading(false);
            return;
        }

        const fetchRecipe = async () => {
            try {
                const docRef = doc(db, "recipes", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setRecipe({
                        id: docSnap.id,
                        title: data.title ?? "",
                        description: data.description ?? "",
                        ingredients: data.ingredients ?? [],
                        steps: data.steps ?? [],
                        prepTime: data.prepTime ?? "",
                        cookTime: data.cookTime ?? "",
                        servings: data.servings ?? "",
                        tags: data.tags ?? [],
                        imageUrl: data.imageUrl ?? null,
                    });
                } else {
                    setError("Recette introuvable.");
                }
            } catch {
                setError("Impossible de charger la recette.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <section className="relative">
                <div className="max-w-7xl mx-auto px-4 pt-12 relative">
                    <p className="text-gray-300">Chargement…</p>
                </div>
                <div className="ellipse ellipse-one"/>
            </section>
        );
    }

    if (error || !recipe) {
        return (
            <section className="relative">
                <div className="max-w-7xl mx-auto px-4 pt-12 relative">
                    <p className="text-red-400">{error || "Recette introuvable."}</p>
                </div>
                <div className="ellipse ellipse-one"/>
            </section>
        );
    }

    return (
        <section className="relative">
            <div className="max-w-7xl mx-auto px-4 pt-12 pb-16 relative">
                <div className={styles.wrapper}>
                    {recipe.imageUrl && (
                        <img
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            className="w-full max-h-96 object-cover rounded-2xl mb-8"
                        />
                    )}

                    <h1 className="text-white text-5xl font-semibold pb-4">{recipe.title}</h1>
                    <p className="text-gray-300 text-lg pb-8">{recipe.description}</p>

                    <div className="flex flex-wrap gap-6 pb-10 text-sm text-gray-400">
                        {recipe.prepTime && (
                            <div className="flex items-center gap-2">
                                <span className="text-indigo-400">Préparation</span>
                                <span>{recipe.prepTime}</span>
                            </div>
                        )}
                        {recipe.cookTime && (
                            <div className="flex items-center gap-2">
                                <span className="text-indigo-400">Cuisson</span>
                                <span>{recipe.cookTime}</span>
                            </div>
                        )}
                        {recipe.servings && (
                            <div className="flex items-center gap-2">
                                <span className="text-indigo-400">Couverts</span>
                                <span>{recipe.servings}</span>
                            </div>
                        )}
                    </div>

                    {recipe.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pb-10">
                            {recipe.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {recipe.ingredients.length > 0 && (
                        <section className="pb-10">
                            <h2 className="text-white text-2xl font-semibold pb-4">Ingrédients</h2>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ing, idx) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <li key={idx} className="text-gray-300 flex gap-2">
                                        <span className="text-indigo-400">•</span>
                                        <span>{ing.name}</span>
                                        {ing.qty && <span className="text-gray-500">— {ing.qty}</span>}
                                        {ing.unit && <span className="text-gray-500">{ing.unit}</span>}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {recipe.steps.length > 0 && (
                        <section>
                            <h2 className="text-white text-2xl font-semibold pb-4">Instructions</h2>
                            <ol className="space-y-4">
                                {recipe.steps.map((step, idx) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <li key={idx} className="flex gap-4 text-gray-300">
                                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium">
                                            {idx + 1}
                                        </span>
                                        <p className="pt-1.5">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    )}
                </div>
            </div>
            <div className="ellipse ellipse-one"/>
        </section>
    );
}
