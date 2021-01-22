module.exports = {
    stripeSecret: process.env.NODE_ENV === 'production' ? process.env.STRIPE_SK_KEY : "sk_test_51IAJbuE18ded10SPt1ZsHD5wn7cfwVs6cqgxukHTqWWM8GRRn709qWINMUoUsGRmlNuj9L649DSKSafFfQm42kQb00wYlE3tge"
};