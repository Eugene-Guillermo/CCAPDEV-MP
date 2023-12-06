const { Schema, SchemaTypes, model } = require('mongoose');

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    display: {
        type: String,
        required: true,
        unique: true
    },
    account_type: {
        type: String,
        required: true
    }
});

const User = model('user', userSchema); 

module.exports = User;