import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <div>
            <h1>Accueil</h1>
            <p>
                Bonjour, veuillez cliquer sur suivant pour commencer à échanger avec votre carte bancaire.
                Sachez que ce site est juste le support de <strong>Cloud Pay</strong> pour récupérer votre argent via Carte Bancaire, ainsi après votre transaction
                il vous faudra vous rendre sur notre <a href={"https://discord.gg/BS2a4zuG"} target={"_blank"}>Discord</a> pour continuer votre échange.
            </p>
            <Link to="/pay">
                <button>Commencer</button>
            </Link>
        </div>
    )
};

export default Home;