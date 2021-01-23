import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

//Components
import Home from "../Home/Home";
import Payment from "../Payment/Payment";
import Success from '../EndPayment/Success';
import Error from "../EndPayment/Error";

// Stripe
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const key = require('../../config/dev.js');
const stripePromise = loadStripe(key.publishableKey);

const App = () =>{
    return (
        <Router>
            <Elements
                stripe={stripePromise}
            >
                <div className="App">
                    <nav>Cloud Pay</nav>
                    <Switch>
                        <Route path="/" exact>
                            <Home/>
                        </Route>
                        <Route path="/pay" exact>
                            <Payment/>
                        </Route>
                        <Route path="/pay/success" exact>
                            <Success/>
                        </Route>
                        <Route path="/pay/error" exact>
                            <Error/>
                        </Route>
                    </Switch>
                </div>
            </Elements>
        </Router>
  );
}

export default App;
