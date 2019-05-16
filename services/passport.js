const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
 const key = require('../config/keys')

//Registrating the type of strategy
passport.use( new GoogleStrategy({
    clientID: key.GoogleClientID,
    clientSecret: key.googleClientSecret,
    callbackURL: '/auth/google/callback' ////This is the route the user will be redirected from google with the code to our sever.This must be the same as athourised route in google
 }, (accessToken) => {
     //When a user grant permission we put that user code in that url and we can access all the data about user through the arguments we pass to the callback function
   console.log(accessToken)
 }))
 