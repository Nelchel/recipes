import {useEffect, useState, type FormEvent} from "react";
import styles from "./RecipeForm.module.scss";
import {collection, doc, serverTimestamp, setDoc,} from "firebase/firestore";
import {db} from "../../firebaseClient";
import Button from "../Button/Button";

interface RecipeFormProps {
    setIsSubmit: (v: boolean) => void;
}

interface Ingredient {
    name: string;
    qty: string;
    unit: string;
}

export default function RecipeForm({setIsSubmit}: RecipeFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([{name: "", qty: "", unit: ""}]);
    const [steps, setSteps] = useState<string[]>([""]);
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [servings, setServings] = useState("");
    const [tags, setTags] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("recipeForm");
        if (saved) {
            const data = JSON.parse(saved);
            setTitle(data.title || "");
            setDescription(data.description || "");
            setIngredients(data.ingredients?.length ? data.ingredients : [{name: "", qty: "", unit: ""}]);
            setSteps(data.steps?.length ? data.steps : [""]);
            setPrepTime(data.prepTime || "");
            setCookTime(data.cookTime || "");
            setServings(data.servings || "");
            setTags(data.tags || "");
            setImagePreview(data.imagePreview || "");
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
            imagePreview: imagePreview || "",
        };
        localStorage.setItem("recipeForm", JSON.stringify(data));
    }, [title, description, ingredients, steps, prepTime, cookTime, servings, tags, imagePreview]);

    const addIngredient = () =>
        setIngredients((arr) => [...arr, {name: "", qty: "", unit: ""}]);

    const removeIngredient = (idx: number) =>
        setIngredients((arr) => arr.filter((_, i) => i !== idx));

    const updateIngredient = (idx: number, field: keyof Ingredient, value: string) =>
        setIngredients((arr) =>
            arr.map((ing, i) => (i === idx ? {...ing, [field]: value} : ing))
        );

    const addStep = () => setSteps((arr) => [...arr, ""]);
    const removeStep = (idx: number) => setSteps((arr) => arr.filter((_, i) => i !== idx));
    const updateStep = (idx: number, value: string) =>
        setSteps((arr) => arr.map((s, i) => (i === idx ? value : s)));

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const cleanedIngredients = ingredients.filter((i) => i.name.trim() !== "");
            const cleanedSteps = steps.filter((s) => s.trim() !== "");
            const id = (window.crypto?.randomUUID?.() ?? String(Date.now()));
            const tagsArr = tags.split(",").map((t) => t.trim()).filter(Boolean);

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
                imageUrl: null,
                createdAt: serverTimestamp(),
            };

            const col = collection(db, "recipes");
            const docRef = doc(col, id);
            await setDoc(docRef, recipe);

            setTitle("");
            setDescription("");
            setIngredients([{name: "", qty: "", unit: ""}]);
            setSteps([""]);
            setPrepTime("");
            setCookTime("");
            setServings("");
            setTags("");
            setImagePreview("");
            localStorage.removeItem("recipeForm");

            setIsSubmit(true)
        } catch (err) {
            console.error("Failed to save recipe:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.formContent}>
                <div className="flex gap-6">
                    <div className={styles.formContentFile}>
                        <div className="flex items-center justify-center">
                            <label htmlFor="dropzone-file" className={styles.dropzoneFile}>
                                <svg className="w-8 h-8 mb-4" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className={styles.dropzoneFileLabel}>
                                    <span>Cliquez pour importer</span> ou faites glisser vos fichiers ici
                                </p>
                                <p className={styles.dropzoneFileSublabel}>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImagePreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </label>
                        </div>
                        <p className="pt-4">Télécharger l'image de couverture de la recette</p>
                    </div>
                    <div className="w-full">
                        <p className="pb-4">Nom de la recette</p>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full form-content-input"
                        />
                        <p className="py-4">Description</p>
                        <textarea className="w-full form-content-input form-content-input-desc"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="flex gap-6 pt-4 w-full">
                    <div className={styles.formContentInputLarge}>
                        <p className="pb-4">Instructions</p>
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2 pb-3">
                                <span className={styles.textSecondary}>{idx + 1}.</span>
                                <input
                                    className="form-content-input w-full"
                                    placeholder="Instructions"
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
                                        className={`inline-flex h-9 w-9 items-center justify-center ${styles.roundedButton} ${styles.buttonMinus}`}
                                        aria-label="Supprimer une étape"
                                    >
                                        <span>-</span>
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="m-auto w-fit pt-3">
                            <button
                                type="button"
                                onClick={addStep}
                                className={`inline-flex h-9 w-9 items-center justify-center ${styles.roundedButton}`}
                                aria-label="Ajouter une étape"
                            >
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                    <div className={styles.formContentInputLarge}>
                        <p className="pb-4">Ingrédients</p>
                        {ingredients.map((ing, idx) => (
                            <div key={idx} className="flex items-center gap-2 pb-3">
                                <span className={styles.textSecondary}>{idx + 1}.</span>
                                <input
                                    className="form-content-input w-full"
                                    placeholder="Nom de l'ingrédient"
                                    value={ing.name}
                                    onChange={(e) => updateIngredient(idx, "name", e.target.value)}
                                />
                                <input
                                    className={`form-content-input ${styles.formContentInputQty}`}
                                    placeholder="Quantité"
                                    value={ing.qty}
                                    onChange={(e) => updateIngredient(idx, "qty", e.target.value)}
                                />
                                <input
                                    className={`form-content-input ${styles.formContentInputQty}`}
                                    placeholder="Unité"
                                    value={ing.unit}
                                    onChange={(e) => updateIngredient(idx, "unit", e.target.value)}
                                />
                                {ingredients.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeIngredient(idx)}
                                        className={`inline-flex h-9 w-9 items-center justify-center ${styles.roundedButton} ${styles.buttonMinus}`}
                                        aria-label="Supprimer une étape"
                                    >
                                        <span>-</span>
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="m-auto w-fit pt-3">
                            <button
                                type="button"
                                onClick={addIngredient}
                                className={`inline-flex h-9 w-9 items-center justify-center ${styles.roundedButton}`}
                                aria-label="Ajouter une étape"
                            >
                                <span>+</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6 pt-6">
                    <div className={styles.formContentInputTime}>
                        <p className="pb-4">Temps de préparation</p>
                        <input type="text" className="form-content-input w-full" value={prepTime}
                               onChange={(e) => setPrepTime(e.target.value)}/>
                    </div>
                    <div className={styles.formContentInputTime}>
                        <p className="pb-4">Temps de cuisson</p>
                        <input type="text" className="form-content-input w-full" value={cookTime}
                               onChange={(e) => setCookTime(e.target.value)}/>
                    </div>
                    <div className={styles.formContentInputTime}>
                        <p className="pb-4">Nombre de couverts</p>
                        <input type="text" className="form-content-input w-full" value={servings}
                               onChange={(e) => setServings(e.target.value)}/>
                    </div>
                </div>
                <div className="w-full">
                    <p className="pb-4 pt-8">Tags de la recette</p>
                    <input type="text" className="form-content-input w-full" value={tags}
                           onChange={(e) => setTags(e.target.value)}/>
                </div>
                <div className="w-fit m-auto pt-10">
                    <Button type="submit" disabled={submitting}><p>Ajouter une recette</p></Button>
                </div>
            </div>
        </form>
    );
}
