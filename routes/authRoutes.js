const express = require('express');
const passport = require('passport');
const app = express();

//We are finding a way to export these two routes. Since these routes app from express and express has defined inside the index file, we need to create a function that accept app as argument so that we can call this method and pass in app.


module.exports = (app) => {
        //ROUTE TO INITIATE OAUTH FLOW
        app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
           })
        )

        //This route will authenticate the user before sending the users code to google for get their their data and if everything goes on well all the users data can be found that redirect url
        app.get('/auth/google/callback', passport.authenticate('google'));

        //LOGOUT
        app.get('/logout', (req, res) => {
                req.logout()
               res.send(`<h1>You have logout</h1>`) 
        })

        //ROUTES FOR USER SIGNED 
        app.get('/api/current_user', (req, res) => {
                res.send(req.user) 
        })
}



