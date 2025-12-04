import RecipeForm from "../../../components/RecipeForm/RecipeForm";
import React, {useEffect, useState} from "react";
import Notification from "../../../components/Notification/Notification";
import {AnimatePresence} from "framer-motion";
import "./add.css"

export default function AddRecipe({addRecipe}) {
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (!isSubmit) return;

        const timer = setTimeout(() => {
            setIsSubmit(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [isSubmit]);

    return (
        <section className="relative">
            <div className="max-w-7xl m-auto relative">
                <h2 className="add-title">Ajouter une recette</h2>
                <RecipeForm setIsSubmit={setIsSubmit}/>
                <AnimatePresence>
                    {isSubmit && <Notification/>}
                </AnimatePresence>
            </div>
            <div className="ellipse ellipse-one"/>
        </section>
    )
}
