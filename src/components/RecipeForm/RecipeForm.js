import React, {useEffect, useState} from "react";
import './RecipeForm.css';
import {
    collection,
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../firebaseClient";

export default function RecipeForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([{ name: "", qty: "", unit: "" }]);
    const [steps, setSteps] = useState([""]);
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [servings, setServings] = useState("");
    const [tags, setTags] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [image,setImage]= useState("")

    useEffect(() => {
        const saved = localStorage.getItem("recipeForm");
        if (saved) {
            const data = JSON.parse(saved);
            setTitle(data.title || "");
            setDescription(data.description || "");
            setIngredients(data.ingredients?.length ? data.ingredients : [{ name: "", qty: "", unit: "" }]);
            setSteps(data.steps?.length ? data.steps : [""]);
            setPrepTime(data.prepTime || "");
            setCookTime(data.cookTime || "");
            setServings(data.servings || "");
            setTags(data.tags || "");
            setImage(data.image || null);
        }
    }, []);

    useEffect(() => {
        const data = {
            title,
            description,
            ingredients,
            steps,
            prepTime,
            cookTime,
            servings,
            tags,
            image,
        };
        localStorage.setItem("recipeForm", JSON.stringify(data));
    }, [title, description, ingredients, steps, prepTime, cookTime, servings, tags, image]);

    const addIngredient = () =>
        setIngredients((arr) => [...arr, { name: "", qty: "", unit: "" }]);

    const removeIngredient = (idx) =>
        setIngredients((arr) => arr.filter((_, i) => i !== idx));

    const updateIngredient = (idx, field, value) =>
        setIngredients((arr) =>
            arr.map((ing, i) => (i === idx ? { ...ing, [field]: value } : ing))
        );

    const addStep = () => setSteps((arr) => [...arr, ""]);
    const removeStep = (idx) => setSteps((arr) => arr.filter((_, i) => i !== idx));
    const updateStep = (idx, value) =>
        setSteps((arr) => arr.map((s, i) => (i === idx ? value : s)));

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg("");

        try {
            const cleanedIngredients = ingredients.filter((i) => i.name.trim() !== "");
            const cleanedSteps = steps.filter((s) => s.trim() !== "");
            const id = (window.crypto?.randomUUID?.() ?? String(Date.now()));
            const tagsArr = tags.split(",").map((t) => t.trim()).filter(Boolean);

            // upload image (si présente)
/*            const imageUrl = await uploadImageIfNeeded(id);*/


            const recipe = {
                id,
                title: title.trim(),
                description: description.trim(),
                ingredients: cleanedIngredients,
                steps: cleanedSteps,
                prepTime: prepTime.trim(),
                cookTime: cookTime.trim(),
                servings: servings.trim(),
                tags: tagsArr,
                imageUrl:  null,
                createdAt: serverTimestamp(),
            };

            const col = collection(db, "recipes");
            const docRef = doc(col, id);
            await setDoc(docRef, recipe);

            setTitle("");
            setDescription("");
            setIngredients([{ name: "", qty: "", unit: "" }]);
            setSteps([""]);
            setPrepTime("");
            setCookTime("");
            setServings("");
            setTags("");
            setImageFile(null);
            setImagePreview("");
            localStorage.removeItem("recipeForm");

            alert("Recette enregistrée !");
        } catch (err) {
            setErrorMsg("Impossible d’enregistrer la recette. Réessaie dans un instant.");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <form className="form" onSubmit={onSubmit}>
            <div className="form-content">
                <div className="flex gap-6">
                    <div className="form-content-file">
                        <div className="flex items-center justify-center">
                            <label htmlFor="dropzone-file"
                                   className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                        className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                                        800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden"/>
                            </label>
                        </div>
                        <p className="text-white pt-4">Télécharger l'image de couverture de la recette</p>
                    </div>
                    <div className="w-full">
                        <p className="text-white pb-4">Nom de la recette</p>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full form-content-input"
                        />
                        <p className="text-white py-4">Description</p>
                        <textarea className="w-full form-content-input form-content-input-desc" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="flex gap-6 pt-4 w-full">
                    <div className="form-content-input-large">
                        <p className="text-white pb-4">Instructions</p>
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2 pb-3">
                                <span className="w-7 text-slate-500">{idx + 1}.</span>
                                <input
                                    className="form-content-input w-full"
                                    placeholder="direction..."
                                    value={step}
                                    onChange={(e) => updateStep(idx, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            if (idx === steps.length - 1) addStep();
                                        }
                                    }}
                                />
                                {steps.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeStep(idx)}
                                        className="px-2 py-2 rounded-md border border-slate-300 hover:bg-slate-50"
                                        aria-label="Supprimer l'étape"
                                    >
                                        🗑
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="m-auto w-fit pt-3">
                            <button
                                type="button"
                                onClick={addStep}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-slate-50 border-slate-300 hover:bg-slate-50"
                                aria-label="Ajouter une étape"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="form-content-input-large">
                        <p className="text-white pb-4">Ingrédients</p>
                        {ingredients.map((ing, idx) => (
                            <div key={idx} className="flex items-center gap-2 pb-3">
                                <span className="w-7 text-slate-500">{idx + 1}.</span>
                                <input
                                    className="form-content-input w-full"
                                    placeholder="ingredient name"
                                    value={ing.name}
                                    onChange={(e) => updateIngredient(idx, "name", e.target.value)}
                                />
                                <input
                                    className="form-content-input form-content-input-qty"
                                    placeholder="quantity"
                                    value={ing.qty}
                                    onChange={(e) => updateIngredient(idx, "qty", e.target.value)}
                                />
                                <input
                                    className="form-content-input form-content-input-qty"
                                    placeholder="unit"
                                    value={ing.unit}
                                    onChange={(e) => updateIngredient(idx, "unit", e.target.value)}
                                />
                                {ingredients.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeIngredient(idx)}
                                        className="col-span-1 px-2 py-2 rounded-md border border-slate-300 hover:bg-slate-50"
                                        aria-label="Supprimer l'ingrédient"
                                    >
                                        🗑
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="m-auto w-fit pt-3">
                            <button
                                type="button"
                                onClick={addIngredient}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-slate-50 border-slate-300 hover:bg-slate-50"
                                aria-label="Ajouter une étape"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6 pt-6">
                    <div className="form-content-input-time">
                        <p className="text-white pb-4">Temps de préparation</p>
                        <input type="text" className="form-content-input w-full" />
                    </div>
                    <div className="form-content-input-time">
                        <p className="text-white pb-4">Temps de cuisson</p>
                        <input type="text" className="form-content-input w-full" />
                    </div>
                    <div className="form-content-input-time">
                        <p className="text-white pb-4">Nombre de couverts</p>
                        <input type="text" className="form-content-input w-full" />
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-white pb-4 pt-8">Tags de la recette</p>
                    <input type="text" className="form-content-input w-full" />
                </div>
                <div className="w-fit m-auto pt-10">
                    <button type="submit" className="form-content-button"><p className="text-white">Ajouter une recette</p></button>
                </div>
            </div>
        </form>
    );
}
