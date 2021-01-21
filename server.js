const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
const path = require('path');

const key = require('./config/dev')
const Stripe = require('stripe')(key.stripeSecret);

// MiddleWares
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://cloud-pay-card-payment.herokuapp.com/']
const corsOptions = {
    origin: (origin, callback) => {
        console.log(`**Origin of request ${origin}`)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));
app.use(bodyParser());



// Production Part
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res)=> {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    })
}


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});

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