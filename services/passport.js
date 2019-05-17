const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')// This means we can access all the models created
const key = require('../config/keys');
require('../models/user')//Requiring the model created. This model has collection called users

//======MODEL CLASS====================
 //Requiring model class
const User = mongoose.model('users')//This means we are pulling users from mongoose and two arguments means we are loading something into mongoose
//=========END MODEL CLASS


//=========CREATING SERIALIZER=======
passport.serializeUser((user, done) => {
//The user is what has been saved or pull out from the database. Or this is the user in our DB who want to perform actions on our site, there we have to create token/cookie by using passport.serializer

   done(null, user.id);
   //The user.id is what identifies the person and this is the ide created by mongoDB
    //We can user google id but mongoDB is the appropriate.
    //OAuth's only purpose is to allow someone to sign in. After that we use our own internal ID'S
})
//=======END serializeUser==================
//======DESERIALIZE===============
passport.deserializeUser((id, done)=> {
  //The id is the user.id we passed in to serializer and now we are turning it into actuall user
  //We have to loop through our data which user has cookie set on
  User.findById(id)
  .then((user)=> {
      done(null, user)
  })
})
//======END DESERIALIZE===========

//========Registrating the type of strategy=======
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
 