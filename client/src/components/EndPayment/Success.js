import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return(
        <div>
            <h1>Bravo</h1>
            <p>
                Bravo, votre transaction a bien été reçu. Nous tenons à vous remercier de la confiance que vous accordez à <strong>Cloud Pay</strong> <br/>
                Veuillez à présent vous rendre sur notre <a href="/#">Serveur Discord</a> pour continuer. <br/>
                Toute notre équipe se tiens à votre disposition pour répondre à toutes vos questions. <br/>
            </p>
            <Link to={"/"}>
                <button>Retour Accueil</button>
            </Link>
        </div>
    )
}

export default Success;