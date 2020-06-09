const passport = require('passport');

module.exports = (app) =>{
    // indicates where the passport identification happens.
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email'] // users information
        })
    );

    // this authentication directs to accessToken => on Google Strategy
    app.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
        res.redirect('/surveys')
    });

    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user',(req,res)=>{
        console.log("current users was called")
        res.send(req.user)
    });
}