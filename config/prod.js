//production keys here, 
// do commit prod.js!!
module.exports = {
    "googleClientId":process.env.GOOGLE_CLIENT_ID,
    "googleClientsecret":process.env.GOOGLE_CLIENT_SECRET,
    "mongoURI":process.env.MONGO_URI,
    "cookieKey":process.env.COOKIE_KEY,
    "stripePublishableKey":process.env.STRIPE_PUBLISHABLE_KEY,
    "stripeSecretKey":process.env.STRIPE_SECRETKEY,
    "sendGridKey" : process.env.SEND_GRID_KEY,
    "redirectionDomain" : process.env.REDIRECT_DOMAIN
}