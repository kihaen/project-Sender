const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//console.developers.google.com

//place in cookie using mongos unique id
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser( async(id, done)=>{
    const user = await User.findById(id)
    done(null,user);
});

passport.use(new googleStrategy(
    {
        clientID : keys.googleClientId,
        clientSecret : keys.googleClientsecret,
        callbackURL : '/auth/google/callback',
        proxy : true
    },
    async (accessToken, refreshToken, profile, done) =>{
        const exisitingUser = await User.findOne({googleId : profile.id})
        if(exisitingUser){
            return done(null, exisitingUser);
        }
        const user = await new User({ googleId : profile.id }).save()
        done(null, user);
    }
)); 