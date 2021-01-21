import React, { useState } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Payment = () => {

    let history = useHistory();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState("")
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutError, setCheckoutError] = useState("");
    const stripe = useStripe();
    const element = useElements();

    const selectHandler = (e) => {
        setPaymentMethod(e.target.value);
    };
    const amountHandler = (e) => {
        setAmount(e.target.value);
    };
    const nameHandler = (e) => {
        setName(e.target.value);
    };
    const emailHandler = (e) => {
        setEmail(e.target.value);
    };
    const phoneHandler = (e) => {
        setPhone(e.target.value);
    };
    const addressHandler = (e) => {
        setAddress(e.target.value);
    };
    const cardHandler = (e) => {

        if (e.error) {
            console.log(e.error.message)
            setCheckoutError(e.error.message);
        } else {
            setCheckoutError("");
        }

    };

    const paymentIntent = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const cardElement = element.getElement("card");

        const billingInfo = {
            name: name,
            phone: phone,
            email: email,
            address: {
                line1: address,
            },
        };
        let data = {
            amount: amount,
            paymentMethod: paymentMethod,
            receipt_email: email,
        };

        try {
            const paymentIntent = await axios.post('/pay', data);
            const paymentMethodObj = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingInfo,
            });
            if (paymentMethodObj.error) {
                setCheckoutError(paymentMethodObj.error.message);
                setIsProcessing(false);
                return
            };
            const confirmPayment = await stripe.confirmCardPayment(paymentIntent.data, {
                payment_method: paymentMethodObj.paymentMethod.id,
            });
            if (confirmPayment.error) {
                setCheckoutError(confirmPayment.error.message);
                setIsProcessing(false);
                return
            };

            if (confirmPayment) {
                history.push('/pay/success')
            }
        } catch (err) {
            setCheckoutError(err.message);
            setIsProcessing(false);
        }
    };

    return(
        <div>
            <h1>Information sur votre transaction</h1>
            <h3>Choix de la transaction</h3>

            <form onSubmit={paymentIntent}>
                <div>
                    <label htmlFor="name">Nom: </label>
                    <input id="name" type="text" name="name" onChange={nameHandler} required/>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" name="email" onChange={emailHandler} required/>
                </div>
                <div>
                    <label htmlFor="phone">Téléphone: </label>
                    <input id="phone" type="number" name="phone" onChange={phoneHandler} required/>
                </div>
                <div>
                    <label htmlFor="address">Adresse: </label>
                    <input id="address" type="text" name="address" onChange={addressHandler} required/>
                </div>
                <select onChange={selectHandler} name={"PaymentMethod"}>
                    <option value="">...</option>
                    <option value="paypal">Vers PayPal</option>
                    <option value="bitcoin">Vers Bitcoin</option>
                    <option value="vcc">Vers VCC</option>
                </select>
                <p>
                    Dans la partie suivante, veuillez préciser le montant que vous souhaitez convertir.
                    Ecrivez la somme tout attaché (ex: 20€ -> 2000, 0.99€ -> 0099).
                    Les taxes qui sont appliquées sont sur notre <a href={"/#"}>Discord</a>
                </p>
                <div>
                    <label htmlFor="amount">Montant: </label>
                    <input id="amount" type="number" name="amount" min="10" onChange={amountHandler} required/>
                </div>
                <h6>{checkoutError}</h6>
                <CardElement
                    options={{
                        hidePostalCode: true,
                        style:{
                            base:{
                                fontSize: '20px'
                            }
                        }
                    }}
                    onChange={cardHandler}
                />
                <button type="submit" disabled={isProcessing}>{isProcessing ? "Paiment ..." : "Payer"}</button>
            </form>
        </div>
    )
};

export default Payment;