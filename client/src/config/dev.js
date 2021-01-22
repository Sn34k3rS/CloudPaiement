let secret_public_key = 'pk_test_51IAJbuE18ded10SPLxYKbB4RbU6nHUlt3arR32wmMvLNl13n2YzjtLjN7o3BcaSeUaF0AmRG2vaTwj9db9gZWsDZ00uiDNSU7L';

if (process.env.NODE_ENV === 'production') {
    secret_public_key = process.env.STRIPE_PK_KEY
    console.log(secret_public_key)
}

module.exports.Key = {
    publishableKey: secret_public_key
}