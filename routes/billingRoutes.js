const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');


module.exports = (app) =>{
    //POST requires a body parser reminder to self!, Middlewares are allowed as long as request eventually gets processed.
    //Middleswares are executed prior to these requests!
    app.post('/api/stripe', requireLogin, async(req,res) =>{

        const charge = await stripe.charges.create({
            amount : 500,
            currency : 'usd',
            description : '$5 for 5 credits',
            source : req.body.id
        });
        
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
}