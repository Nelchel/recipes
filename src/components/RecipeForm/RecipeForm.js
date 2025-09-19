import React, { useState } from "react";
import './RecipeForm.css';

export default function RecipeForm({ addRecipe }) {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addRecipe({ title, ingredients, instructions });
        setTitle("");
        setIngredients("");
        setInstructions("");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
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
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            required
                            className="form-content-input w-full"
                        />
                    </div>
                    <div className="form-content-input-large">
                        <p className="text-white pb-4">Ingrédients</p>
                      <textarea
                          value={ingredients}
                          onChange={(e) => setIngredients(e.target.value)}
                          placeholder="Ingrédients (un par ligne)"
                          required
                          className="form-content-input w-full"
                      />
                    </div>
                </div>
                <button type="submit">Ajouter</button>
            </div>
        </form>
    );
}
