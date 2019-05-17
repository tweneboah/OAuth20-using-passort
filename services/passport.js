const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')// This means we can access all the models created
const key = require('../config/keys');
require('../models/user')//Requiring the model created. This model has collection called users

 //Requiring model class
const User = mongoose.model('users')//This means we are pulling users from mongoose and two arguments means we are loading something into mongoose



//Registrating the type of strategy
passport.use( new GoogleStrategy({
    clientID: key.GoogleClientID,
    clientSecret: key.googleClientSecret,
    callbackURL: '/auth/google/callback' ////This is the route the user will be redirected from google with the code to our sever.This must be the same as athourised route in google
 }, (accessToken, refreshToken, profile, done) => {
     //When a user grant permission we put that user code in that url and we can access all the data about user through the arguments we pass to the callback function

     //CREATING USER HERE BASE ON CONDITION
     //First we have to create instance of the User model.
     //You have to set the same field created in the schema

     //CHECK IF USER EXIST BEFORE SAVING
    User.findOne({googleId: profile.id})
    .then((existingUser) => {
      if(existingUser){
        //We already have a record
        //We can redirect or do whatever you want here
        done(null, existingUser)
      }else {
        //Saving the new user
        new User({
          googleId: profile.id //coming from user google profile
          }).save((user)=> {
             return done(null, user)
        })
      }
    })



   console.log(profile)
 }))
 