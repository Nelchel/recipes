import {Link} from "react-router-dom";
import "./homepage.css";
import React from "react";
import Button from "../../components/Button/Button"

export default function Homepage() {
    return (
        <main className="max-w-7xl m-auto px-4 py-12">
            <section className="relative">
                <div className="max-w-7xl m-auto relative">
                    <div className="wrapper">
                        <h1 className="wrapper-title">Bienvenue !</h1>
                        <h3 className="wrapper-subtitle">Ajoute tes recettes via l’onglet Recettes.</h3>

                        <div className="wrapper-buttons">
                            <Link to="/recipes/add">
                                <Button><p>Ajouter une recette</p></Button>
                            </Link>
                            <Link to="/recipes/list">
                                <Button><p>Voir les recettes</p></Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="ellipse ellipse-one"/>
            </section>
        </main>
    )
}
