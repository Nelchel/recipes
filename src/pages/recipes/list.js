// src/pages/recipes/list.js
import React, { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList/RecipeList";
import { db } from "../../firebaseClient";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

export default function ListRecipe() {
    const [recipes, setRecipes] = useState([]);
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
                    };
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
        <section>
            <div className="max-w-7xl m-auto">
                {err ? (
                    <p className="text-red-400">{err}</p>
                ) : (
                    <RecipeList recipes={recipes} onSelect={(id) => navigate(`/recipes/${id}`)} />
                )}
            </div>
        </section>
    );
}
