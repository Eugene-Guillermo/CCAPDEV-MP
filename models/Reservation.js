const { Schema, SchemaTypes, model } = require('mongoose');

var reservationSchema = new Schema({
    seatNo: {
        type: Number,
        required: true
    },
    reservationDate: {
        type: Date,
        required: true
    },
    reservationTime: {
        type: String,
        required: true
    },
    reserver: {
        type: String
    }
});

const Reservation = model('reservation', reservationSchema); 

module.exports = Reservation;