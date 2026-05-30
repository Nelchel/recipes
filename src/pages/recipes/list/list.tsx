import {useEffect, useState} from "react";
import RecipeList from "../../../components/RecipeList/RecipeList";
import {db} from "../../../firebaseClient";
import {collection, onSnapshot, orderBy, query,} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

interface Recipe {
    id: string;
    title: string;
    description: string;
    [key: string]: unknown;
}

export default function ListRecipe() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const q = query(collection(db, "recipes"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(
            q,
            (snap) => {
                const list = snap.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate
                            ? data.createdAt.toDate()
                            : data.createdAt || null,
                    } as unknown as Recipe;
                });
                setRecipes(list);
                setLoading(false);
            },
            (error) => {
                console.error(error);
                setErr("Impossible de charger les recettes.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <section>
                <div className="max-w-7xl m-auto">
                    <p className="text-slate-300">Chargement des recettes…</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative">
            <div className="max-w-7xl m-auto relative">
                {err ? (
                    <p className="text-red-400">{err}</p>
                ) : (
                    <RecipeList recipes={recipes} onSelect={(id: string) => navigate(`/recipes/${id}`)}/>
                )}
            </div>
            <div className="ellipse ellipse-one"/>
        </section>
    );
}
