const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

const key = require('./config/dev')
const Stripe = require('stripe')(key.stripeSecret);

// MiddleWares
app.use(cors());
app.use(bodyParser());

// Routes
app.post("/pay", async (req, res)=> {
    const {amount, paymentMethod, receipt_email} = req.body;

    const paymentIntent = await Stripe.paymentIntents.create({
        amount: amount,
        currency: 'eur',
        description: paymentMethod,
        receipt_email: receipt_email
    });

    try {
        res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
        console.log("Fail")
        res.status(500).json({
            message: err.message,
        });
    }
});

// Production Part
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});