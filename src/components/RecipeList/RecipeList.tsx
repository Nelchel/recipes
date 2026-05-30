import styles from "./RecipeList.module.scss";

interface Recipe {
    id: string;
    title: string;
    description: string;
    [key: string]: unknown;
}

interface RecipeListProps {
    recipes: Recipe[];
    onSelect?: (id: string) => void;
}

export default function RecipeList({recipes, onSelect}: RecipeListProps) {
    return (
        <div className={styles.wrapperList}>
            <h2 className={styles.wrapperListTitle}>Recettes</h2>
            <ul className="grid grid-cols-3 gap-10 pt-10">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="col-span-1" onClick={() => onSelect?.(recipe.id)}>
                        <div className={styles.wrapperListCard}>
                            <h4 className={styles.wrapperListCardTitle}>
                                {recipe.title}
                            </h4>
                            <p className={styles.wrapperListCardDescription}>{recipe.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
