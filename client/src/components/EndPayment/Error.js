import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return(
        <div>
            <h1>Erreur</h1>
            <p>
                Désolé, votre transaction a eu un problème. Nous tenons à nous excuser de cette gène occasionnée <br/>
                N'hésitez pas à retenter votre transaction ou contactez notre équipe sur <a href="/#">Discord</a> <br/>
                Toute notre équipe se tiens à votre disposition pour répondre à toutes vos questions. <br/>
            </p>
            <Link to={"/"}>
                <button>Retour Accueil</button>
            </Link>
        </div>
    )
}

export default Error;