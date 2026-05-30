import styles from "./homepage.module.scss";
import Button from "../../components/Button/Button";

export default function Homepage() {
    return (
        <main className="max-w-7xl m-auto px-4 py-12">
            <section className="relative">
                <div className="max-w-7xl m-auto relative">
                    <div className={styles.wrapper}>
                        <h1 className={styles.wrapperTitle}>Bienvenue !</h1>
                        <h3 className={styles.wrapperSubtitle}>Ajoute tes recettes via l'onglet Recettes.</h3>

                        <div className={styles.wrapperButtons}>
                            <Button to="/recipes/add"><p>Ajouter une recette</p></Button>
                            <Button to="/recipes/list"><p>Voir les recettes</p></Button>
                        </div>
                    </div>
                </div>
                <div className="ellipse ellipse-one"/>
            </section>
        </main>
    );
}
