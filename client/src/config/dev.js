const Keys = {
    publishableKey: process.env.NODE_ENV === 'production' ? `${process.env.STRIPE_PK_KEY}` : 'pk_test_51IAJbuE18ded10SPLxYKbB4RbU6nHUlt3arR32wmMvLNl13n2YzjtLjN7o3BcaSeUaF0AmRG2vaTwj9db9gZWsDZ00uiDNSU7L'
}

export default Keys;