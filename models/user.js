const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema ({
    googleId: String
});

//Telling mongoose there is a model class created. The user is name of the collection which will be created by mongoose
//When the application boots up, mongoose will know that there is a userSchema created for users collection. Mongoose will created it automatically if it doesn't exist.
//We have t
mongoose.model('users', userSchema); 

 

