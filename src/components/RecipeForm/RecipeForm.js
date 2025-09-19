import React, { useState } from "react";
import './RecipeForm.css';

export default function RecipeForm({ addRecipe }) {
    const [title, setTitle] = useState("");
    const [instructions, setInstructions] = useState("");

    const [ingredients, setIngredients] = useState([
        { name: "", qty: "", unit: "" },
        { name: "", qty: "", unit: "" },
        { name: "", qty: "", unit: "" },
        { name: "", qty: "", unit: "" },
    ]);

    const [steps, setSteps] = useState(["", "", "", ""]);

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

    const onSubmit = (e) => {
        e.preventDefault();

        const cleanedIngredients = ingredients.filter((i) => i.name.trim() !== "");
        const cleanedSteps = steps.filter((s) => s.trim() !== "");

        const recipe = {
            id: (window.crypto?.randomUUID?.() ?? String(Date.now())),
            title: title.trim(),
            ingredients: cleanedIngredients,
            steps: cleanedSteps,
            createdAt: new Date().toISOString(),
        };

        addRecipe(recipe);

        setTitle("");
        setIngredients([{ name: "", qty: "", unit: "" }]);
        setSteps([""]);
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
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2"
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
                        <textarea className="w-full form-content-input form-content-input-desc"/>
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
                <button type="submit">Ajouter</button>
            </div>
        </form>
    );
}
