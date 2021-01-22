let secret_key = "sk_test_51IAJbuE18ded10SPt1ZsHD5wn7cfwVs6cqgxukHTqWWM8GRRn709qWINMUoUsGRmlNuj9L649DSKSafFfQm42kQb00wYlE3tge";

if (process.env.NODE_ENV === "production") {
    secret_key = process.env.STRIPE_SK_KEY
}

module.exports = {
    stripeSecret: secret_key
};