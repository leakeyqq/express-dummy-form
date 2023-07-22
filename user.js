const dotenv = require('dotenv').config();
const connection_string = process.env.CONNECT_STRING;
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect(connection_string,{
useNewUrlParser: true,
useUnifiedTopology: true
});

// Create model
const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String
});

// Export model
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userData',User,'userData');