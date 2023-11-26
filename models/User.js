const { Schema, SchemaTypes, model } = require('mongoose');

var reservations = new Schema({
    lab: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    seat: {
        type: Number,
        required: true
    },
    id:{
        type: Number,
        required: true
    },
    created:{
        type: Date,
        required: true
    }
});

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
    },
    myReservations:[reservations]
});

const User = model('user', userSchema); 

module.exports = User;