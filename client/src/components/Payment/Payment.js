import React, { useState } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const validatePhoneNumber = require('validate-phone-number-node-js');

const Payment = () => {

    let history = useHistory();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(0);
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
    const cardHandler = (e) => {

        if (e.error) {
            setCheckoutError(e.error.message);
        } else {
            setCheckoutError("");
        }

    };

    const paymentIntent = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Data Vérification

        // PaiementMethod
        if (paymentMethod === "") {
           setCheckoutError("Veuillez indiquer une plateforme de destination pour votre échange")
            setIsProcessing(false);
           return
        } else {
            setCheckoutError('');
        }

        // Amount
        let checkAmount = false;
        if (!isNaN(amount)) {
            if (amount.length >= 4) {
                checkAmount = true;
            }
        }
        if (!checkAmount) {
            setCheckoutError("Veuillez mettre un montant valide (un nombre avec 4 chiffres)");
            setIsProcessing(false);
            return
        } else {
            setCheckoutError('')
        }

        // Phone
        let checkPhone = false;
        const result = await validatePhoneNumber.validate(phone);
        if (result) {
            if (phone.length === 10) {
                checkPhone = true;
            }
        }
        if (!checkPhone) {
            setCheckoutError("Veuillez mettre un numéro de téléphone valide");
            setIsProcessing(false);
            return
        } else {
            setCheckoutError('')
        }

        const cardElement = element.getElement("card");

        const billingInfo = {
            name: name,
            phone: phone,
            email: email,
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
            }
            const confirmPayment = await stripe.confirmCardPayment(paymentIntent.data, {
                payment_method: paymentMethodObj.paymentMethod.id,
            });
            if (confirmPayment.error) {
                setCheckoutError(confirmPayment.error.message);
                setIsProcessing(false);
                return
            }

            if (confirmPayment) {
                history.push('/pay/success')
            }
        } catch (err) {
            setCheckoutError(err.message);
            setIsProcessing(false);
        }
    };

    return(
        <div className="CheckoutForm">
            <h3 className="purchase-msg">Choix de la transaction</h3>

            <form onSubmit={paymentIntent} className="form">
                <input
                    type="text"
                    placeholder="Nom"
                    name="name"
                    onChange={nameHandler}
                    required
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    onChange={emailHandler}
                    required
                />
                <input
                    type="number"
                    placeholder="n° Téléphone"
                    name="phone"
                    onChange={phoneHandler}
                    required
                />
                <select
                    onChange={selectHandler}
                    name={"PaymentMethod"}
                    placeholder="Destination"
                >
                    <option value="">...</option>
                    <option value="paypal">Vers PayPal</option>
                    <option value="bitcoin">Vers Bitcoin</option>
                    <option value="vcc">Vers VCC</option>
                </select>
                <p>
                    Dans la partie suivante, veuillez préciser le montant que vous souhaitez convertir.
                    Ecrivez la somme tout attaché (ex: 20€ -> 2000, 0.99€ -> 0099).
                    Les taxes qui sont appliquées sont sur notre <a href={"https://discord.gg/BS2a4zuG"} target={"_blank"}>Discord</a>
                </p>
                <input
                    type="number"
                    name="amount"
                    placeholder="Montant"
                    min="10"
                    onChange={amountHandler}
                    required
                />
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
                <button type="submit" disabled={isProcessing}>{isProcessing ? "Paiement ..." : "Payer"}</button>
            </form>
        </div>
    )
};

export default Payment;