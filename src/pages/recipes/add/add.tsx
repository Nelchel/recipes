import RecipeForm from "../../../components/RecipeForm/RecipeForm";
import {useEffect, useState} from "react";
import Notification from "../../../components/Notification/Notification";
import {AnimatePresence} from "framer-motion";
import styles from "./add.module.scss";

export default function AddRecipe() {
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
                <h2 className={styles.addTitle}>Ajouter une recette</h2>
                <RecipeForm setIsSubmit={setIsSubmit}/>
                <AnimatePresence>
                    {isSubmit && <Notification/>}
                </AnimatePresence>
            </div>
            <div className="ellipse ellipse-one"/>
        </section>
    );
}
